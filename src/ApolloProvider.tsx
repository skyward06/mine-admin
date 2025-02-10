import React from 'react';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import {
  split,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  type NextLink,
  type Operation,
  createHttpLink,
  ApolloProvider,
  type FetchResult,
} from '@apollo/client';

import { CONFIG } from 'src/config';

import store from './store/store';
import FreeShare from './sections/FreeShare';
import { fragment } from './utils/fragement';
import { setFrontActions } from './store/slices/frontAction.slice';

const httpLink = createHttpLink({
  uri: CONFIG.SERVER_URL,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: CONFIG.WS_PATH,
    connectionParams: () => {
      const token = localStorage.getItem(CONFIG.storageTokenKey);
      return {
        authorization: token ? `Bearer ${token}` : '',
      };
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(CONFIG.storageTokenKey);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const mutationMiddlewareLink = new ApolloLink((operation: Operation, forward: NextLink) => {
  const definition = getMainDefinition(operation.query);
  const isMutation =
    definition.kind === 'OperationDefinition' && definition.operation === 'mutation';

  return forward(operation).map((response: FetchResult) => {
    if (isMutation) {
      const { data } = response;
      if (data) {
        Object.values(data as Record<string, any>).forEach((res) => {
          if (res.frontActions) {
            store.dispatch(setFrontActions(res?.frontActions));
          }
        });
      }
    }

    return response;
  }); // Continue the request
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink, // Authorization
    mutationMiddlewareLink, // Middleware executes before every mutation
    splitLink, // HTTP & WebSocket handling
  ]),
  cache: new InMemoryCache(fragment),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
  connectToDevTools: true,
});

const ApolloAppProvider = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>
    {children}
    <FreeShare />
  </ApolloProvider>
);
export default ApolloAppProvider;
