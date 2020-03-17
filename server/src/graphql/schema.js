import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat } from "graphql";

import SubscriptionType from "./subscriptions/SubscriptionType";
import {getList, PAST_LIST, PAST_POPULATION_MEAN_LIST} from '../utils'

const ResultObjectType = new GraphQLObjectType({
  name: "Result",
  description: "Result data",
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
      type: new GraphQLList(GraphQLList(GraphQLList(GraphQLFloat))),
      resolve: ({ population }) => population,
    },
    pastResults: {
      type: new GraphQLList(GraphQLFloat),
      resolve: async () => getList(PAST_LIST),
    },
    populationResultsMean: {
      type: GraphQLList(GraphQLFloat),
      resolve: async () => getList(PAST_POPULATION_MEAN_LIST)
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    status: {
      type: GraphQLString,
      resolve: () => "online"
    },
    results: {
      type: ResultObjectType,
      resolve: () => ({ fitness: 0, generation: 0 })
    }
  })
});

export default new GraphQLSchema({
  query: QueryType,
  subscription: SubscriptionType
});
