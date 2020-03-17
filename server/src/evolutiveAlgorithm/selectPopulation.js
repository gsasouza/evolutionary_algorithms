import { addItemToList, getItem, getList, getListLength } from "../utils/redis";
import {
  BEST_RESULT,
  GENERATIONS,
  PAST_LIST,
  PAST_POPULATION_MEAN_LIST,
  POPULATION_LIST,
  redis,
  STEPS,
  TESTED_LIST
} from "../utils";
import {
  CROSS_OVER_INDIVIDUAL,
  MUTATE_INDIVIDUAL,
  POPULATION_SIZE
} from "./contraints";
import { MASTER_PROCESS_TYPES } from "../cluster/handleMaster";
import { handleCreatedIndividuals } from "./createPopulation";
import handleNewResult from "../graphql/subscriptions/handleNewResult";

const DELAY = 500;

export const selectIndividual = async ({ payload }) => {
  const { mutationRate, resultList, individual, bestResult } = payload;
  const newIndividual = CROSS_OVER_INDIVIDUAL(individual, bestResult, resultList);
  const mutatedIndividual = MUTATE_INDIVIDUAL(newIndividual, mutationRate);
  addItemToList(POPULATION_LIST, mutatedIndividual, () =>
    process.send({ type: MASTER_PROCESS_TYPES.SELECTED_INDIVIDUALS })
  );
};

export const handleSelectedIndividuals = () => {
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
  global.mutationConfig.increaseGenerationWithRate();

  const generation = (await getItem(GENERATIONS)) || 1;
  const bestResult = await getItem(BEST_RESULT);
  const { result, value } = JSON.parse(bestResult);
  addItemToList(PAST_LIST, result);
  redis.set(GENERATIONS, `${Number.parseInt(generation) + 1}`);

  if (process.env.TERMINAL)
    return console.log(`${Number.parseInt(generation)}# FITNESS: ${result}, MUTATION RATE: ${global.mutationConfig.getRate()}`);

  const results = await getList(TESTED_LIST);
  const population = await getList(POPULATION_LIST);

  const populationResultMean =
    results.reduce((acc, cur) => {
      const resultData = JSON.parse(cur);
      return acc + Number.parseFloat(resultData.result);
    }, 0) / results.length;


  addItemToList(PAST_POPULATION_MEAN_LIST, populationResultMean);

  return handleNewResult({
    generation: Number.parseInt(generation),
    fitness: result,
    value: JSON.parse(value).map(v => Number.parseFloat(v)),
    population: population.map(item => JSON.parse(item).map(v => Number.parseFloat(v))),
    results,
    populationResultMean
  });
};

const handleAnalyze = async () => {
  await persistResults();
  if (process.env.TERMINAL) return handleRepeat();
  setTimeout(handleRepeat, DELAY);
};
