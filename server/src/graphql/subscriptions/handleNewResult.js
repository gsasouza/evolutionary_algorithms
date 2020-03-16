import pubSub, { EVENTS } from './pubsub'

export default async ({ generation, fitness }) => {
  await pubSub.publish(EVENTS.RESULT.NEW, { NewResult: { fitness, generation } });
}
