import { GraphQLFloat, GraphQLInt, GraphQLObjectType } from "graphql";
import pubSub, { EVENTS } from './pubsub'

const NewResultPayloadType = new GraphQLObjectType({
  name: "NewResultPayload",
  fields: () => ({
    fitness: {
      type: GraphQLFloat,
      resolve: ({ fitness }) => fitness
    },
    generation: {
      type: GraphQLInt,
      resolve: ({ generation }) => generation
    }
  })
});

const newResultSubscription = {
  type: NewResultPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.RESULT.NEW)
};

export default newResultSubscription;
