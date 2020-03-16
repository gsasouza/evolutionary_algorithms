import { TEST_FUNCTION } from "./contraints";
import { addItemToList } from "../utils/redis";
import { TESTED_LIST } from "../utils";
import { MASTER_PROCESS_TYPES } from "../cluster/handleMaster";

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
