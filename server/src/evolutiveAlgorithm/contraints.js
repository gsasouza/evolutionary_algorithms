import { BEST_RESULT, getItem } from "../utils";

export const getRandomNumberInInterval = (min = DOMAIN[0], max = DOMAIN[1]) =>
  Math.random() * (max - min + 1) + min;

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

export const MUTATION_SETUP = () => {
  const FITNESS_THRESHOLD = 0.0000000000001;
  const LAST_COUNT = 50;
  const baseRate = 0.1;
  let rate = 0.1;
  let generationsWithRate = 0;
  let maxGenerationsWithRate = 0;
  let lastChangeType = null;
  let increaseChanges = 0;
  let decreaseChanges = 0;

  const increaseRate = () => {
    maxGenerationsWithRate = LAST_COUNT / 2;
    generationsWithRate = 0;
    lastChangeType = "increase";
    increaseChanges = increaseChanges + 1;
    const multiplier = increaseChanges * 2 > 10 ? 10 : increaseChanges * 2;
    rate = baseRate * multiplier;
  };

  const decreaseRate = () => {
    maxGenerationsWithRate = LAST_COUNT;
    generationsWithRate = 0;
    lastChangeType = "decrease";
    decreaseChanges = decreaseChanges + 1;
    const multiplier = Math.pow(10, (decreaseChanges/2) >= 4 ? 4 : decreaseChanges);
    rate = baseRate / multiplier;
  };

  const returnToBaseRate = () => {
    maxGenerationsWithRate = 0;
    generationsWithRate = 0;
    lastChangeType = null;
    rate = baseRate;
  };

  const increaseGenerationWithRate = () => {
    generationsWithRate = generationsWithRate + 1;
  };

  const shouldIncreaseRate = () => !!maxGenerationsWithRate && (generationsWithRate >= maxGenerationsWithRate) && (lastChangeType === "decrease");

  const shouldReturnToBaseRate = () => maxGenerationsWithRate && (generationsWithRate >= maxGenerationsWithRate) && (lastChangeType === "increase");

  const shouldDecrease = () => !maxGenerationsWithRate;

  const getGenerationWithRate = () => generationsWithRate;
  const getRate = () => rate;

  return {
    decreaseRate,
    increaseRate,
    returnToBaseRate,
    increaseGenerationWithRate,
    getRate,
    getGenerationWithRate,
    shouldIncreaseRate,
    shouldReturnToBaseRate,
    shouldDecrease,
    LAST_COUNT,
    FITNESS_THRESHOLD
  };
};
