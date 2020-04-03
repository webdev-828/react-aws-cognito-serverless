import ApolloClient from "apollo-client";
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from "apollo-link-error";
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { Auth } from 'aws-amplify';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
  addTypename: true
});

const link = ApolloLink.from(
  [
    errorLink,
    new HttpLink({
      uri: process.env.REACT_APP_HGE_ENDPOINT,
    })
  ]
);

const linkState = withClientState({
  cache,
});



const authLink = setContext(async (_, { headers }) => {
  const session = await Auth.currentSession();
  const token = session.idToken.jwtToken;
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
});


const client = new ApolloClient({
  cache,
  link: ApolloLink.from([linkState, authLink, link])
});

export default client;
