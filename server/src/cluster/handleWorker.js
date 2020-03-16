import {
  WORKER_PROCESS_TYPES,
  createIndividual,
  testIndividual,
  selectIndividual
} from "../evolutiveAlgorithm";

const handleWorker = msg => {
  const { type } = msg;
  switch (type) {
    case WORKER_PROCESS_TYPES.CREATE_POPULATION_INDIVIDUAL: {
      return createIndividual();
    }
    case WORKER_PROCESS_TYPES.TEST_INDIVIDUAL: {
      return testIndividual(msg);
    }
    case WORKER_PROCESS_TYPES.SELECT_INDIVIDUAL: {
      return selectIndividual(msg);
    }
    default:
      return;
  }
};

export default handleWorker;
