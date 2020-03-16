import { POPULATION_SIZE, TEST_FUNCTION } from "./contraints";
import { addItemToList, getList, getListLength } from "../utils/redis";
import {
  getBalancedWorker,
  PAST_LIST,
  POPULATION_LIST,
  STEPS,
  TESTED_LIST
} from "../utils";
import { MASTER_PROCESS_TYPES } from "../cluster/handleMaster";
import { WORKER_PROCESS_TYPES, recreatePopulation } from "./index";

export const testIndividual = ({ payload }) => {
  const { individual } = payload;
  const testResult = TEST_FUNCTION(Number.parseFloat(individual));
  return addItemToList(
    TESTED_LIST,
    { value: individual, result: testResult },
    () => {
      process.send({ type: MASTER_PROCESS_TYPES.TESTED_INDIVIDUALS });
    }
  );
};

export const handleSetupTestIndividuals = async () => {
  const individuals = await getList(POPULATION_LIST);
  individuals.forEach((individual, index) => {
    const worker = getBalancedWorker(index);
    worker.send({
      type: WORKER_PROCESS_TYPES.TEST_INDIVIDUAL,
      payload: { individual }
    });
  });
};

export const handleTestedIndividuals = () => {
  getListLength(TESTED_LIST, async (err, length) => {
    if (global.step !== STEPS.TEST) return;
    if (length === POPULATION_SIZE) {
      global.step = STEPS.SELECTION;
      return handleSetupSelection();
    }
  });
};

const adjustMutationRate = async currentBestResult => {
  const THRESHOLD = 0.0000000000001;
  const LAST_COUNT = 100;

  const {
    generationsWithRate,
    lastChange,
    maxGenerationsWithRate,
    baseRate
  } = global.mutationConfig;

  if (maxGenerationsWithRate) {
    // DIVERGE
    if (generationsWithRate >= maxGenerationsWithRate) {
      if (lastChange && lastChange === 'decrease') {
        global.mutationConfig = {
          ...global.mutationConfig,
          generationsWithRate: 0,
          rate: baseRate * 10,
          maxGenerationsWithRate: LAST_COUNT / 2,
          lastChange: 'increase',
        };
        return
      }
      global.mutationConfig = {
        ...global.mutationConfig,
        generationsWithRate: 0,
        rate: baseRate,
        maxGenerationsWithRate: 0,
        lastChange: null
      };

    }
    return;
  }


  const pastResults = await getList(PAST_LIST);
  const lastResults = pastResults.slice(
    Math.max(pastResults.length - LAST_COUNT, 0)
  );

  const lastResultsMean =
    lastResults.reduce((acc, cur) => acc + Number.parseFloat(cur), 0) / lastResults.length;
  // CONVERGE

  if (Math.abs(lastResultsMean - currentBestResult.result) < THRESHOLD) {
    global.mutationConfig = {
      ...global.mutationConfig,
      generationsWithRate: 0,
      rate: baseRate / 10,
      maxGenerationsWithRate: LAST_COUNT,
      lastChange: 'decrease'
    };
  }
};

const handleSetupSelection = async () => {
  const resultList = await getList(TESTED_LIST);
  const bestResult = await calculateBestResult(resultList);
  await adjustMutationRate(bestResult);
  recreatePopulation(bestResult);
  resultList
    .filter((_, index) => index !== bestResult.index)
    .forEach((individual, index) => {
      const worker = getBalancedWorker(index);
      worker.send({
        type: WORKER_PROCESS_TYPES.SELECT_INDIVIDUAL,
        payload: { individual, mutationConfig: global.mutationConfig, resultList }
      });
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
