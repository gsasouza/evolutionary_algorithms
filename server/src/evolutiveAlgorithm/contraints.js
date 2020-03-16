import { BEST_RESULT, getRandomNumberInInterval, getItem } from "../utils";

export const POPULATION_SIZE = 5;

export const TEST_FUNCTION = x =>
  2 * Math.cos(0.39 * x) +
  5 * Math.sin(0.5 * x) +
  0.5 * Math.cos(0.1 * x) +
  10 * Math.sin(0.7 * x) +
  5 * Math.sin(1 * x) +
  5 * Math.sin(0.35 * x);

export const DOMAIN = [0, 100];

export const CREATE_INDIVIDUAL = () => getRandomNumberInInterval();

const combat = (individualA, individualB) => {
  const objA = JSON.parse(individualA || "{}");
  const objB = JSON.parse(individualB || "{} ");
  const resultA = Number.parseFloat(objA.result);
  const resultB = Number.parseFloat(objB.result);
  return resultA > resultB ? objA : objB;
};

export const CROSS_OVER_INDIVIDUAL = async list => {
  const bestResult = await getItem(BEST_RESULT);
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
      Number.parseFloat(JSON.parse(bestResult).value)) /
    3
  );
};

export const MUTATE_INDIVIDUAL = individual => {
  const MAX = DOMAIN[1] * 0.5;
  const TAX_MUT = 0.1;
  const mutatedIndividual =
    individual +
    (getRandomNumberInInterval(DOMAIN[0], MAX) -
      getRandomNumberInInterval(DOMAIN[0], MAX)) *
      TAX_MUT;
  if (mutatedIndividual > DOMAIN[1]) return mutatedIndividual - DOMAIN[1];
  if (mutatedIndividual < DOMAIN[0]) return mutatedIndividual + DOMAIN[1];
  return mutatedIndividual;
};
