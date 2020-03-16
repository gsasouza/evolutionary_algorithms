import { createServer } from 'http';
import Koa from 'koa';
import cors from 'kcors';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import koaPlayground from 'graphql-playground-middleware-koa';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql'
import schema from './schema'

const PORT = 5000;

export const createGraphQLServer = () => {
  const app = new Koa();
  const router = new Router();

  router.all('/playground', koaPlayground({
    endpoint: '/graphql',
    subscriptionEndpoint: `ws://localhost:${PORT}/subscriptions`,
  }))

  router.all('/graphql', graphqlHTTP({
    schema,
    graphiql: false
  }))

  app.use(cors());
  app.use(router.routes()).use(router.allowedMethods());

  const server = createServer(app.callback());

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    SubscriptionServer.create(
      {
        onConnect: connectionParams => console.log('Client subscription connected!', connectionParams),
        onDisconnect: () => console.log('Client subscription disconnected!'),
        execute,
        subscribe,
        schema,
      },
      {
        server,
        path: '/subscriptions',
      },
    )
  })
};
