export const getBalancedWorker = index => {
  const balancedWorker = index % global.workers.length;
  return global.workers[balancedWorker];
};

export const POPULATION_LIST = "POPULATION_LIST";
export const TESTED_LIST = "TESTED_LIST";
export const PAST_LIST = "PAST_LIST";
export const PAST_POPULATION_MEAN_LIST = "PAST_POPULATION_MEAN_LIST";
export const BEST_RESULT = "BEST_RESULT";
export const GENERATIONS = "GENERATIONS";

export const STEPS = {
  CREATE: "CREATE",
  TEST: "TEST",
  SELECTION: "SELECTION",
  ANALYZE: "ANALYZE"
};

export * from "./redis";
export { default as redis } from  './redis';
