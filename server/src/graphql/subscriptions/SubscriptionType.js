import { GraphQLObjectType } from 'graphql';
import NewResultSubscription from './NewResultSubscription';

export default new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    NewResult: NewResultSubscription,
  },
});
