import { POPULATION_SIZE } from "../evolutiveAlgorithm/contraints";
import {
  BEST_RESULT,
  POPULATION_LIST,
  STEPS,
  TESTED_LIST,
  ANALYZE_LIST,
  addItemToList,
  getBalancedWorker,
  getList,
  getListLength,
  redis,
  PAST_LIST,
  getItem,
  GENERATIONS
} from "../utils";
import { WORKER_PROCESS_TYPES } from "../evolutiveAlgorithm";
import handleNewResult from '../graphql/subscriptions/handleNewResult'

export const MASTER_PROCESS_TYPES = {
  START: "START",
  CREATED_INDIVIDUALS: "CREATED_INDIVIDUALS",
  TESTED_INDIVIDUALS: "TESTED_INDIVIDUALS",
  SELECTED_INDIVIDUALS: "SELECTED_INDIVIDUALS"
};

const createPopulation = () =>
  new Array(POPULATION_SIZE).fill(null).forEach((_, index) => {
    const worker = getBalancedWorker(index);
    worker.send({
      type: WORKER_PROCESS_TYPES.CREATE_POPULATION_INDIVIDUAL
    });
  });

const handleCreatedIndividuals = () => {
  getListLength(POPULATION_LIST, (err, length) => {
    if (global.step !== STEPS.CREATE) return;
    if (length === POPULATION_SIZE) {
      global.step = STEPS.TEST;
      return handleSetupTestIndividuals();
    }
  });
};

const handleSetupTestIndividuals = async () => {
  const individuals = await getList(POPULATION_LIST);
  individuals.forEach((individual, index) => {
    const worker = getBalancedWorker(index);
    worker.send({
      type: WORKER_PROCESS_TYPES.TEST_INDIVIDUAL,
      payload: { individual }
    });
  });
};

const handleTestedIndividuals = () => {
  getListLength(TESTED_LIST, async (err, length) => {
    if (global.step !== STEPS.TEST) return;
    if (length === POPULATION_SIZE) {
      global.step = STEPS.SELECTION;
      return handleSetupSelection();
    }
  });
};

const calculateBestResult = async testResults => {
  return testResults.reduce(
    (acc, cur, index) => {
      const { result, value } = JSON.parse(cur);
      if (result > acc.result) return { value, result, index };
      return acc;
    },
    { result: 0 }
  );
};

const recreatePopulation = bestResult => {
  redis.set(BEST_RESULT, JSON.stringify(bestResult));
  redis.del(POPULATION_LIST);
  addItemToList(POPULATION_LIST, Number.parseFloat(bestResult.value));
};

const handleSetupSelection = async () => {
  const testResults = await getList(TESTED_LIST);
  const bestResult = await calculateBestResult(testResults);
  recreatePopulation(bestResult);
  testResults
    .filter((_, index) => index !== bestResult.index)
    .forEach((individual, index) => {
      const worker = getBalancedWorker(index);
      worker.send({
        type: WORKER_PROCESS_TYPES.SELECT_INDIVIDUAL,
        payload: { individual }
      });
    });
};

const handleSelectedIndividuals = () => {
  getListLength(POPULATION_LIST, (err, length) => {
    if (global.step !== STEPS.SELECTION) return;
    if (length === POPULATION_SIZE) {
      global.step = STEPS.ANALYZE;
      return handleAnalyze();
    }
  });
};

const handleRepeat = () => {
  global.step = STEPS.CREATE;
  redis.del(TESTED_LIST);
  return handleCreatedIndividuals();
};

const persistResults = async () => {
  const generation = (await getItem(GENERATIONS)) || 1;
  const bestResult = await getItem(BEST_RESULT);
  const { result } = JSON.parse(bestResult);
  addItemToList(PAST_LIST, result);
  redis.set(GENERATIONS, `${Number.parseInt(generation) + 1}`);
  return handleNewResult({ generation: Number.parseInt(generation), fitness: result })
};

const handleAnalyze = async () => {
  await persistResults();
  return handleRepeat();
};

const handleMaster = ({ type }) => {
  switch (type) {
    case MASTER_PROCESS_TYPES.START:
      return createPopulation();
    case MASTER_PROCESS_TYPES.CREATED_INDIVIDUALS:
      return handleCreatedIndividuals();
    case MASTER_PROCESS_TYPES.TESTED_INDIVIDUALS:
      return handleTestedIndividuals();
    case MASTER_PROCESS_TYPES.SELECTED_INDIVIDUALS:
      return handleSelectedIndividuals();
    default:
      return;
  }
};

export default handleMaster;
