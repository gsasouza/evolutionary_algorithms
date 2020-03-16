import { DOMAIN } from "../evolutiveAlgorithm/contraints";

export const getBalancedWorker = index => {
  const balancedWorker = index % global.workers.length;
  return global.workers[balancedWorker];
};

export const getRandomNumberInInterval = (min = DOMAIN[0], max = DOMAIN[1]) =>
  Math.random() * (max - min + 1) + min;

export const POPULATION_LIST = "POPULATION_LIST";
export const TESTED_LIST = "TESTED_LIST";
export const PAST_LIST = "PAST_LIST";
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
