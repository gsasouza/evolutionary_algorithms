import {CREATE_INDIVIDUAL, getSafeValue, POPULATION_SIZE} from "./contraints";
import { addItemToList, getListLength } from "../utils/redis";
import {
  BEST_RESULT,
  getBalancedWorker,
  POPULATION_LIST,
  redis,
  STEPS
} from "../utils";
import { MASTER_PROCESS_TYPES } from "../cluster/handleMaster";
import { WORKER_PROCESS_TYPES, handleSetupTestIndividuals } from "./index";

export const createIndividual = () => {
  const individual = CREATE_INDIVIDUAL();
  return addItemToList(POPULATION_LIST, individual, () =>
    process.send({ type: MASTER_PROCESS_TYPES.CREATED_INDIVIDUALS })
  );
};

export const createPopulation = () =>
  new Array(POPULATION_SIZE).fill(null).forEach((_, index) => {
    const worker = getBalancedWorker(index);
    worker.send({
      type: WORKER_PROCESS_TYPES.CREATE_POPULATION_INDIVIDUAL
    });
  });

export const handleCreatedIndividuals = () => {
  getListLength(POPULATION_LIST, (err, length) => {
    if (global.step !== STEPS.CREATE) return;
    if (length === POPULATION_SIZE) {
      global.step = STEPS.TEST;
      return handleSetupTestIndividuals();
    }
  });
};

export const recreatePopulation = bestResult => {
  redis.set(BEST_RESULT, JSON.stringify(bestResult));
  redis.del(POPULATION_LIST);
  addItemToList(POPULATION_LIST, getSafeValue(bestResult));
};
