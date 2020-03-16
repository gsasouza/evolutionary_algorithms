import { addItemToList, getList } from "../utils/redis";
import { POPULATION_LIST, TESTED_LIST } from "../utils";
import { CROSS_OVER_INDIVIDUAL, MUTATE_INDIVIDUAL } from "./contraints";
import {MASTER_PROCESS_TYPES} from '../cluster/handleMaster'

export const selectIndividual = async ({ payload }) => {
  const resultList = await getList(TESTED_LIST);
  const newIndividual = await CROSS_OVER_INDIVIDUAL(resultList);
  const mutatedIndividual = MUTATE_INDIVIDUAL(newIndividual);
  addItemToList(POPULATION_LIST, mutatedIndividual, () =>
    process.send({ type: MASTER_PROCESS_TYPES.SELECTED_INDIVIDUALS }) );
};
