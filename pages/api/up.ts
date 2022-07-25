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
  let postgres;
  let sqlserver;
  const auth = req.headers.authorization || req.cookies.T_ACCESS_TOKEN;
  try {
    const response1 = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        authorization: `${auth}`,
        "Content-Type": "application/json",
      },
      body: '{"query":"{\\n\\trualive\\n}"}',
    });
    const isalivepostgres = await response1.json();
    postgres = isalivepostgres?.data?.rualive;

    const response2 = await fetch("http://localhost:4001/graphql", {
      method: "POST",
      headers: {
        authorization: `${auth}`,
        "Content-Type": "application/json",
      },
      body: '{"query":"{\\n\\trualive\\n}"}',
    });
    const isalivesqlserver = await response2.json();
    sqlserver = isalivesqlserver?.data?.rualive;

    return res.status(200).json({ postgres, sqlserver });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
