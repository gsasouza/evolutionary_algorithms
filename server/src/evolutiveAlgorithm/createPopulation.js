import { CREATE_INDIVIDUAL } from "./contraints";
import { addItemToList } from "../utils/redis";
import { POPULATION_LIST } from "../utils";
import { MASTER_PROCESS_TYPES } from "../cluster/handleMaster";

export const createIndividual = () => {
  const individual = CREATE_INDIVIDUAL();
  return addItemToList(POPULATION_LIST, individual, () =>
    process.send({ type: MASTER_PROCESS_TYPES.CREATED_INDIVIDUALS })
  );
};
