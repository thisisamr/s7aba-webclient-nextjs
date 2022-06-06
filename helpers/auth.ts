import { User } from "@prisma/client";
// import { GraphQLResolveInfo, GraphQLArgs } from "graphql";

// import { AuthenticationError } from "apollo-server-micro";
import jwt from "jsonwebtoken";
// import { Icontext } from "../graphql/resolvers";
export const createToken = (user: User) =>
  jwt.sign({ ...user }, `${process.env.TOKEN_SECRET}`);

export const getUserFromToken = (token: string) => {
  try {
    const user = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    return user;
    // return models.User.findOne({ id: user.id });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const users = getUserFromToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaXNpc3NvbGltYW5AcHJvdG9ubWFpbC5jb20iLCJpZCI6MSwidGltZSI6MTY1NDQ0MzM1MTE5MCwiaWF0IjoxNjU0NDQzMzUxLCJleHAiOjE2NTQ0NzIxNTF9.GseJP7X4KloJNoYVqRk7O3SlYm0j_i7XqzJtKOAnnS0"
);
console.log("user", users);
// type GraphQLFieldResolveFn = (
//   source?: any,
//   args?: any,
//   context?: Icontext,
//   info?: GraphQLResolveInfo
// ) => any;

// export const authenticated =
//   (next: GraphQLFieldResolveFn) =>
//   (
//     root: unknown,
//     args: GraphQLArgs,
//     context: Icontext,
//     info: GraphQLResolveInfo
//   ) => {
//     if (!context.user) {
//       throw new AuthenticationError("must authenticate");
//     }

//     return next(root, args, context, info);
//   };

// export const authorized =
//   (role: Role, next: GraphQLFieldResolveFn) =>
//   (
//     root: unknown,
//     args: GraphQLArgs,
//     context: Icontext,
//     info: GraphQLResolveInfo
//   ) => {
//     if (context.user.role !== role) {
//       throw new AuthenticationError(`you must have ${role} role`);
//     }

//     return next(root, args, context, info);
//   };
