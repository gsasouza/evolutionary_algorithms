import { domain3d } from './functions/function3d'
import { domain2d } from './functions/function2d'

export * from './functions/function3d';
// export * from './functions/function2d';

const DOMAIN = domain3d;
export const getRandomNumberInInterval = (min = DOMAIN[0], max = DOMAIN[1]) =>
  Math.random() * (max - min + 1) + min;

export const POPULATION_SIZE = 15;


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



