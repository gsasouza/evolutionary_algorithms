import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

import SubscriptionType from "./subscriptions/SubscriptionType";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    status: {
      type: GraphQLString,
      resolve: () => "online"
    }
  })
});

export default new GraphQLSchema({
  query: QueryType,
  subscription: SubscriptionType
});
