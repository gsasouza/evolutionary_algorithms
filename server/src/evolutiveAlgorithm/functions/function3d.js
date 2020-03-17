import { getRandomNumberInInterval, POPULATION_SIZE } from "../contraints";
import { combat } from "./function2d";

// export const function3d = (x, y) => Math.sin(x * y);
export const function3d = (x, y) => {
  if (x === 0 && y === 0) return 0;
  return Math.abs(
    (Math.pow(Math.cos(x), 4) -
      2 * Math.pow(Math.cos(x), 2) * Math.pow(Math.cos(y), 2) +
      Math.pow(Math.cos(y), 4)) /
      Math.sqrt(Math.pow(x, 2) + 2 * Math.pow(y, 2))
  );
};

export const domain3d = [
  [0, 10],
  [0, 10]
];

export const TEST_FUNCTION = (x, y) => function3d(x, y);

export const CREATE_INDIVIDUAL = () => {
  const x = getRandomNumberInInterval(domain3d[0][0], domain3d[0][1]);
  const y = getRandomNumberInInterval(domain3d[1][0], domain3d[1][1]);
  return [x, y];
};

export const getSafeValue = individual => {
  if (typeof individual.value === "string") return JSON.parse(individual.value);
  return individual.value;
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

  const x =
    (Number.parseFloat(getSafeValue(mother)[0]) +
      Number.parseFloat(getSafeValue(father)[0]) +
      Number.parseFloat(getSafeValue(bestResult)[0])) /
    3;
  const y =
    (Number.parseFloat(getSafeValue(mother)[1]) +
      Number.parseFloat(getSafeValue(father)[1]) +
      Number.parseFloat(getSafeValue(bestResult)[1])) /
    3;

  return [x, y];
};

export const CROSS_OVER_INDIVIDUAL = (individual, bestResult, list) => {
  return tournamentSelection(list, bestResult);
};

const keepInInterval = (value, domain) => {
  if (value < domain[0]) {
    const newValue = value + domain[1];
    if (newValue < domain[0]) return keepInInterval(newValue, domain);
    return newValue;
  }
  if (value > domain[1]) {
    const newValue = value - domain[1];
    if (newValue > domain[1]) return keepInInterval(newValue, domain);
    return newValue;
  }
  return value;
};

export const MUTATE_INDIVIDUAL = (individual, TAX_MUT) => {
  const MAX_X = domain3d[0][1] * 0.5;
  const MAX_Y = domain3d[1][1] * 0.5;
  const mutatedX =
    individual[0] +
    (getRandomNumberInInterval(domain3d[0][0], MAX_X) -
      getRandomNumberInInterval(domain3d[0][0], MAX_X)) *
      TAX_MUT;
  const mutatedY =
    individual[1] +
    (getRandomNumberInInterval(domain3d[0][1], MAX_Y) -
      getRandomNumberInInterval(domain3d[0][1], MAX_Y)) *
      TAX_MUT;
  return [
    keepInInterval(mutatedX, domain3d[0]),
    keepInInterval(mutatedY, domain3d[1])
  ];
};
