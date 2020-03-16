import { requestSubscription } from "react-relay";
import { ROOT_ID } from 'relay-runtime';
import graphql from "babel-plugin-relay/macro";
import environment from "../relay/environment";

const newResultSubscription = graphql`
  subscription NewResultSubscription {
    NewResult {
      fitness
      generation
      value
      population
      populationResultMean
    }
  }
`;

const subscriptionConfig = {
  subscription: newResultSubscription,
  variables: {},
  updater: store => {
    const newResult = store.getRootField("NewResult");
    const fitness = newResult.getValue("fitness");
    const generation = newResult.getValue("generation");
    const value = newResult.getValue("value");
    const population = newResult.getValue("population");
    const populationResultMean = newResult.getValue("populationResultMean");

    const rootProxy = store.get(ROOT_ID);
    const results = rootProxy.getLinkedRecord("results")
    if (!results) return;
    results.setValue(fitness, "fitness");
    results.setValue(generation, "generation");
    results.setValue(value, "value");
    results.setValue(population, "population");
    results.setValue([...results.getValue('pastResults'), fitness], 'pastResults');
    results.setValue([...results.getValue('populationResultsMean'), populationResultMean], 'populationResultsMean');
  },
  onError: error => console.log(`An error occured:`, error)
};

export default () => requestSubscription(environment, subscriptionConfig);
