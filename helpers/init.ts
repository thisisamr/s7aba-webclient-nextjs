import chalk from "chalk";
import { postgrestStats, tableIsEmpty } from "../client/queries";
import { postgresclient, Sqlclient } from "../client/apollo";
export interface Stat {
  __typename: string;
  tablename: string;
  count: number;
}

import { ApolloError, DocumentNode } from "@apollo/client";

// export async function getDbStats() {
//   console.log(chalk.bgBlue.green(`Edge-Pro For information Systems`));
//   console.log(chalk.yellowBright("Current records in: rsc_v2"));
//   let arr: Stat[] = [];
//   try {
//     const res = await postgresclient.query({ query: GetNumberOfRecords });
//     res.data.GetNumberOfRecords.forEach((element: Stat) => {
//       arr.push(element);
//     });
//     console.table(
//       [
//         {
//           Addresses: arr[0].count,
//           aspnetusers: arr[1].count,
//           userprofiles: arr[2].count,
//           requests: arr[3].count,
//           shippingorders: arr[4].count,
//           paymenttrasnsactions: arr[5].count,
//         },
//       ],
//       [
//         "Addresses",
//         "aspnetusers",
//         "userprofiles",
//         "requests",
//         "shippingorders",
//         "paymenttrasnsactions",
//       ]
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function Exit() {
//   console.log("\x1b[31m%s\x1b[0m", "\nMake Sure Target Is Empty");
//   process.exit(1);
// }

// export function ExitGeneric(msg: string) {
//   console.log("\x1b[31m%s\x1b[0m", "\nSomthing went wrong\n" + msg);
//   process.exit(1);
// }

// export async function TruncateAllTables() {
//   return new Promise((resolve, reject) => {
//     postgresclient
//       .mutate({
//         mutation: unsafe,
//       })
//       .then(({ data, errors }) => {
//         if (data) {
//           chalk.bgGreen(console.log(data));
//           resolve(data);
//         }
//         if (errors) {
//           errors.map((e) => console.log(e));
//           throw new ApolloError({
//             errorMessage: "somthing went wrong could not clear db successfully",
//           });
//           reject(errors);
//         }
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   });
// }

export const init = async (
  tablname: string,
  query: DocumentNode,
  mutation: DocumentNode
) => {
  get(null, query, mutation);

  //check that the postgres database table:aspnetusers is empty
};

function get(
  cursor: null | string,
  query: DocumentNode,
  mutation: DocumentNode
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
        populatetable(mutationinput, has, cursorr, query, mutation);
      } else {
        console.log("reached end or empty source");
      }
      if (value.error) {
        value.errors?.map((e) => console.log(chalk.red.bold(e)));
        throw new ApolloError(value.error);
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return;
}

function populatetable(
  mutationInput: any,
  has: boolean,
  cursorr: string,
  query: DocumentNode,
  mutation: DocumentNode
) {
  postgresclient
    .mutate({
      mutation: mutation,
      variables: { input: mutationInput },
    })
    .then((response) => {
      if (response.data) {
        console.log(response.data[mutation.definitions[0].name.value]);
      }
      if (response.errors?.length) {
        response.errors.map((e) => console.log(e.message));
      }
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      if (has) {
        get(cursorr, query, mutation);
      }
    });
}
