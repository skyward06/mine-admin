import React, { useState } from 'react';
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

import FreeShare from './sections/FreeShare';
import { fragment } from './utils/fragement';
import { useBoolean } from './hooks/useBoolean';

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

const ApolloAppProvider = ({ children }: { children: React.ReactNode }) => {
  const open = useBoolean();
  const [frontAction, setFrontAction] = useState<any>(null);

  const handleOpen = (message: any) => {
    setFrontAction(message);
    open.onTrue();
  };

  const handleMutationResponse = (responseData: Record<string, any>) => {
    Object.values(responseData).forEach((mutationResult) => {
      if (!mutationResult) return;

      if (typeof mutationResult === 'object') {
        if (mutationResult.frontAction) {
          handleOpen(mutationResult.frontAction);
        }
      } else {
        console.log('Unhandled Response Type:', mutationResult);
      }
    });
  };

  const mutationMiddlewareLink = new ApolloLink((operation: Operation, forward: NextLink) => {
    const isMutation = operation.query.definitions.some(
      (def) => def.kind === 'OperationDefinition' && def.operation === 'mutation'
    );

    return forward(operation).map((response: FetchResult) => {
      if (isMutation) {
        console.log('Type => ', operation);
        console.log('Mutation Response: ', response.data);
        handleMutationResponse(response?.data ?? {});
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

  return (
    <ApolloProvider client={client}>
      {children}
      <FreeShare open={open} frontAction={frontAction} />
    </ApolloProvider>
  );
};
export default ApolloAppProvider;
