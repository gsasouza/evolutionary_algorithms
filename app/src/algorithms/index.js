const SIZE = 5;

export const TEST_FUNCTION = x =>
  2 * Math.cos(0.39 * x) +
  5 * Math.sin(0.5 * x) +
  0.5 * Math.cos(0.1 * x) +
  10 * Math.sin(0.7 * x) +
  5 * Math.sin(1 * x) +
  5 * Math.sin(0.35 * x);

const DOMAIN = [100, 0];

export const generateChartData = () =>
  new Array(DOMAIN[0]).fill(null).map((_, index) => ({
    name: index,
    value: TEST_FUNCTION(index)
  }));

const getRandomInt = (min = DOMAIN[0], max = DOMAIN[1]) =>
  Math.random() * (max - min + 1) + min;

const createPopulation = () =>
  new Array(SIZE).fill(null).map(_ => getRandomInt());

const doTest = population => population.map(TEST_FUNCTION);

const combat = (individualA, individualB) => Math.max(individualA, individualB);

const doTournament = (individual, array) => {
  const father = combat(
    array[Math.round(getRandomInt(SIZE - 1, 0))],
    array[Math.round(getRandomInt(SIZE - 1, 0))]
  );
  const mother = combat(
    array[Math.round(getRandomInt(SIZE - 1, 0))],
    array[Math.round(getRandomInt(SIZE - 1, 0))]
  );
  return (father + mother) / 2;
};

const doCrossOver = (population, bestResultIndex) =>
  population.map((individual, index, array) => {
    if (index === bestResultIndex) return individual;
    return doTournament(individual, array);
    // return (individual + array[bestResultIndex]) / 2;
  });

const mutate = individual => {
  const MAX = DOMAIN[0] * 0.5;
  const TAX_MUT = 0.1;
  const mutatedIndividual =
    individual + (getRandomInt(MAX) - getRandomInt(MAX)) * TAX_MUT;
  if (mutatedIndividual > DOMAIN[0]) return mutatedIndividual - DOMAIN[0];
  if (mutatedIndividual < DOMAIN[1]) return mutatedIndividual + DOMAIN[0];
  return mutatedIndividual;
};

const doMutations = (population, bestResultIndex) => ({
  population: population.map((individual, index) =>
    index === bestResultIndex ? individual : mutate(individual)
  ),
  bestResultIndex
});

const calculateBestResult = results => {
  const bestResult = Math.max(...results);
  return results.findIndex(i => {
    return i === bestResult;
  });
};

const doSelection = (population, results) => {
  const bestResultIndex = calculateBestResult(results);
  return {
    population: doCrossOver(population, bestResultIndex),
    bestResultIndex
  };
};

const evolution = population => {
  const results = doTest(population);
  const { bestResultIndex, population: selectedPopulation } = doSelection(
    population,
    results
  );
  return doMutations(selectedPopulation, bestResultIndex);
};

const defaultPrevData = {
  population: createPopulation(),
  bestResultIndex: 0,
  years: 0
};

export const executeIteration = (prevData = defaultPrevData) => {
  const { population, years } = prevData;
  const evolutionResult = evolution(population);
  return {
    population: evolutionResult.population,
    bestResultIndex: evolutionResult.bestResultIndex,
    years: years + 1
  };
};
