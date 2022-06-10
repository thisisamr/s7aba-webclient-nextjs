// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { gql } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { postgresclient, Sqlclient } from "../../client/apollo";
type Data = {
  sqlserver: boolean;
  postgres: boolean;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: any }>
) {
  //make two requests to each server and respone will be alive or dead
  //sql server
  let postgres;
  let sqlserver;
  try {
    const isAliveSqlserver = await Sqlclient.query({
      query: gql`
        query isalive {
          rualive
        }
      `,
      fetchPolicy: "network-only",
    });
    if (isAliveSqlserver.data) {
      sqlserver = isAliveSqlserver.data.rualive;
    }
    if (isAliveSqlserver.error) {
      sqlserver = false;
    }

    const isAlivepostgres = await postgresclient.query({
      query: gql`
        query isalive {
          rualive
        }
      `,
      fetchPolicy: "network-only",
    });
    if (isAlivepostgres.data) {
      postgres = isAlivepostgres.data.rualive;
    }
    if (isAlivepostgres.error) {
      sqlserver = false;
    }
  } catch (error) {
    // return res.status(500).json({ error });
  }
  //data , error
  res.status(200).json({ postgres, sqlserver });
}
