import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType
} from "graphql";
import pubSub, { EVENTS } from "./pubsub";

const NewResultPayloadType = new GraphQLObjectType({
  name: "NewResultPayload",
  fields: () => ({
    fitness: {
      type: GraphQLFloat,
      resolve: ({ fitness }) => fitness
    },
    value: {
      type: GraphQLList(GraphQLFloat),
      resolve: ({ value }) => value
    },
    generation: {
      type: GraphQLInt,
      resolve: ({ generation }) => generation
    },
    population: {
      type: new GraphQLList(GraphQLList(GraphQLFloat)),
      resolve: ({ population }) => population
    },
    populationResultMean: {
      type: GraphQLFloat,
      resolve: ({ populationResultMean }) => populationResultMean
    }
  })
});

const newResultSubscription = {
  type: NewResultPayloadType,
  subscribe: () => pubSub.asyncIterator(EVENTS.RESULT.NEW)
};

export default newResultSubscription;
