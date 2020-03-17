import {getRandomNumberInInterval, POPULATION_SIZE} from '../contraints'

export const function2d = x =>
  2 * Math.cos(0.39 * x) +
  5 * Math.sin(0.5 * x) +
  0.5 * Math.cos(0.1 * x) +
  10 * Math.sin(0.7 * x) +
  5 * Math.sin(1 * x) +
  5 * Math.sin(0.35 * x);

export const domain2d = [0, 100];

export const TEST_FUNCTION = x =>
  2 * Math.cos(0.39 * x) +
  5 * Math.sin(0.5 * x) +
  0.5 * Math.cos(0.1 * x) +
  10 * Math.sin(0.7 * x) +
  5 * Math.sin(1 * x) +
  5 * Math.sin(0.35 * x);

export const DOMAIN = [0, 100];

export const CREATE_INDIVIDUAL = () => getRandomNumberInInterval();
//
export const combat = (individualA, individualB) => {
  const objA = JSON.parse(individualA || "{}");
  const objB = JSON.parse(individualB || "{} ");
  const resultA = Number.parseFloat(objA.result);
  const resultB = Number.parseFloat(objB.result);
  return resultA > resultB ? objA : objB;
};

const tournamentSelection = (list, bestResult) => {
  const mother = combat(
    list[Math.round(getRandomNumberInInterval(0, POPULATION_SIZE - 2))],
    list[Math.round(getRandomNumberInInterval(0, POPULATION_SIZE - 2))]
  );
  const father = combat(
    list[Math.round(getRandomNumberInInterval(0, POPULATION_SIZE - 2))],
    list[Math.round(getRandomNumberInInterval(0, POPULATION_SIZE - 2))]
  );

  return (
    (Number.parseFloat(mother.value) +
      Number.parseFloat(father.value) +
      Number.parseFloat(bestResult.value)) /
    3
  );
}

const elitismSelection = (individual, bestResult) => (Number.parseFloat(individual.value) + Number.parseFloat(bestResult.value)) / 2;

export const CROSS_OVER_INDIVIDUAL = (individual, bestResult, list) => {
  return tournamentSelection(list, bestResult);
  // return elitismSelection(individual, bestResult)
};

export const MUTATE_INDIVIDUAL = (individual, TAX_MUT) => {
  const MAX = DOMAIN[1] * 0.5;
  const mutatedIndividual =
    individual +
    (getRandomNumberInInterval(DOMAIN[0], MAX) -
      getRandomNumberInInterval(DOMAIN[0], MAX)) *
    TAX_MUT;
  if (mutatedIndividual > DOMAIN[1]) return mutatedIndividual - DOMAIN[1];
  if (mutatedIndividual < DOMAIN[0]) return mutatedIndividual + DOMAIN[1];
  return mutatedIndividual;
};
