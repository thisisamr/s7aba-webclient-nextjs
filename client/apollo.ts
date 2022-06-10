import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client/";
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      asd: "5adegAASD-Amrr-4390-b7So-ASD6DigA04ASDY",
    },
  }));

  return forward(operation);
});
export const Sqlclient = new ApolloClient({
  ssrMode: true,
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_SQLSERVERGQLSERVER,
      fetch,
    })
  ),
  cache: new InMemoryCache({ addTypename: false }),
});
export const postgresclient = new ApolloClient({
  ssrMode: true,
  link: concat(
    authMiddleware,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_POSTGRESGQLSERVER,
    })
  ),
  credentials: "include",
  cache: new InMemoryCache({ addTypename: false }),
});
