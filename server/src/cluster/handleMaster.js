import {
  createPopulation,
  handleCreatedIndividuals,
  handleSelectedIndividuals,
  handleTestedIndividuals
} from "../evolutiveAlgorithm";

export const MASTER_PROCESS_TYPES = {
  START: "START",
  CREATED_INDIVIDUALS: "CREATED_INDIVIDUALS",
  TESTED_INDIVIDUALS: "TESTED_INDIVIDUALS",
  SELECTED_INDIVIDUALS: "SELECTED_INDIVIDUALS"
};

const handleMaster = ({ type }) => {
  switch (type) {
    case MASTER_PROCESS_TYPES.START:
      return createPopulation();
    case MASTER_PROCESS_TYPES.CREATED_INDIVIDUALS:
      return handleCreatedIndividuals();
    case MASTER_PROCESS_TYPES.TESTED_INDIVIDUALS:
      return handleTestedIndividuals();
    case MASTER_PROCESS_TYPES.SELECTED_INDIVIDUALS:
      return handleSelectedIndividuals();
    default:
      return;
  }
};

export default handleMaster;
