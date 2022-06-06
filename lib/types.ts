import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface jwtUser {
  email: string;
  id: number;
  time: number;
  iat: number;
  exp: number;
}

export interface NextApiHandlerExtended {
  (req: NextApiRequest, res: NextApiResponse, user?: User): void;
}
export interface authReq {
  email: string | null;
  password: string | null;
}
export enum authMode {
  SIGNIN = "signin",
  SIGNUP = "signup",
}
