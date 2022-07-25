import { ApolloError, DocumentNode } from "@apollo/client/core";
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { postgresclient, Sqlclient } from "../../client/apollo";
import {
  populateTableuseraddresses,
  poulateTableAddresses,
  poulateTablePaymenttrasnsactions,
  poulateTableRequests,
  poulateTableShippingorders,
  poulateTableUserprofiles,
  poulateTableUsers,
} from "../../client/mutations";
import {
  addressesQuery,
  paymenttrasnsactionsQuery,
  postgrestStats,
  requestsQuery,
  shippingordersQuery,
  useraddressesQuery,
  userprofilesQuery,
  usersQuery,
} from "../../client/queries";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise<{ done: "✅" }>((resolve, reject) => {
    let query;
    let mutation;
    if (req.method !== "POST") {
      reject(res.status(404).json({ error: "unsupported http verb" }));
    }
    const { table } = req.body;
    if (!table) {
      reject(res.status(400).json({ error: "please provide the table name" }));
    }
    switch (table) {
      case "aspnetusers":
        query = usersQuery;
        mutation = poulateTableUsers;
        break;
      case "requests":
        query = requestsQuery;
        mutation = poulateTableRequests;
        break;
      case "userprofiles":
        query = userprofilesQuery;
        mutation = poulateTableUserprofiles;
        break;
      case "addresses":
        query = addressesQuery;
        mutation = poulateTableAddresses;
        break;
      case "shippingorders":
        query = shippingordersQuery;
        mutation = poulateTableShippingorders;
        break;
      case "paymenttrasnsactions":
        query = paymenttrasnsactionsQuery;
        mutation = poulateTablePaymenttrasnsactions;
        break;
      case "useraddresses":
        query = useraddressesQuery;
        mutation = populateTableuseraddresses;
        break;
      default:
        break;
    }
    if (query && mutation) {
      get(null, query, mutation, res, resolve, reject);
    } else {
      reject(res.status(500).json({ error: "somethingwent wrong" }));
    }
  });
}

function get(
  cursor: null | string,
  query: DocumentNode,
  mutation: DocumentNode,
  respone: NextApiResponse,
  resolve
) {
  let has;
  let cursorr;
  let queryName = query.definitions[0].name.value;
  Sqlclient.query({
    query: query,
    variables: {
      first: 100,
      after: cursor,
    },
  })
    .then((value) => {
      if (value.data[queryName].edges.length) {
        has = value.data[queryName].pageInfo.hasNextPage;
        cursorr = value.data[queryName].pageInfo.endCursor;
        const results = value.data[queryName].edges;
        const mutationinput = results.map((item: any) => item.node);
        populatetable(
          mutationinput,
          has,
          cursorr,
          query,
          mutation,
          respone,
          resolve
        );
      } else {
        return respone.send("Reached End or Empty Source!!!");
      }
      if (value.error) {
        throw new ApolloError(value.error);
      }
    })
    .catch((e) => {
      return respone.status(400).json({ error: e });
    });
}

function populatetable(
  mutationInput: any,
  has: boolean,
  cursorr: string,
  query: DocumentNode,
  mutation: DocumentNode,
  res: NextApiResponse,
  resolve
) {
  postgresclient
    .mutate({
      mutation: mutation,
      variables: { input: mutationInput },
    })
    .then((response) => {
      if (response.errors?.length) {
        return res.status(500).json({ errors: response.errors });
      }
    })
    .catch((e) => {
      return res.status(500).json({ errors: e.message });
    })
    .finally(() => {
      if (has) {
        get(cursorr, query, mutation, res, resolve);
      } else {
        resolve(res.status(201).json({ done: "✅" }));
      }
    });
}
