import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { execute } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_URL = process.env.GRAPHQL_URL || "http://localhost:5000/graphql";
const SUBSCRIPTION_URL =
  process.env.SUBSCRIPTION_URL || "ws://localhost:5000/subscriptions";

// const setupSubscription = (config, variables, cacheConfig, observer) => {
//   const query = config.text;
//
//   const subscriptionClient = new SubscriptionClient(SUBSCRIPTION_URL, {
//     reconnect: true
//   });
//   console.log(subscriptionClient);
//   subscriptionClient.subscribe({ query, variables }, (error, result) => {
//     observer.onNext({ data: result });
//   });
// };

const subscriptionClient = new SubscriptionClient(SUBSCRIPTION_URL, {
  reconnect: true,
});

const subscriptionLink = new WebSocketLink(subscriptionClient);

const networkSubscriptions = (operation, variables) =>
  execute(subscriptionLink, {
    query: operation.text,
    variables,
  });

const fetchQuery = async (operation, variables) => {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  });
  return await response.json();
};

const network = Network.create(fetchQuery, networkSubscriptions);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store
});

export default env;
