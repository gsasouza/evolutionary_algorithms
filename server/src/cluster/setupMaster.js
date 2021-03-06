import os from "os";
import cluster from "cluster";
import handleMaster, { MASTER_PROCESS_TYPES } from "./handleMaster";
import { createGraphQLServer } from "../graphql/server";
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

import { MUTATION_SETUP } from "../evolutiveAlgorithm/contraints";

global.workers = [];
global.step = STEPS.CREATE;
global.mutationConfig = MUTATION_SETUP();

const cpuCount = os.cpus().length;

const setupMaster = () => {
  redis.del(POPULATION_LIST);
  redis.del(TESTED_LIST);
  redis.del(PAST_LIST);
  redis.del(GENERATIONS);
  redis.del(BEST_RESULT);
  redis.del(PAST_POPULATION_MEAN_LIST);
  for (let i = 0; i < cpuCount; i++) {
    const worker = cluster.fork();
    global.workers.push(worker);
    worker.on("message", msg => handleMaster(msg));
  }
  createGraphQLServer();
  handleMaster({ type: MASTER_PROCESS_TYPES.START });
};

export default setupMaster;
