import pubSub, { EVENTS } from './pubsub'

export default async ({ generation, fitness, value, population, populationResultMean }) => {
  await pubSub.publish(EVENTS.RESULT.NEW, { NewResult: { fitness, generation, value, population: population, populationResultMean } });
}
