import bcrypt from "bcrypt";
import * as jose from "jose";
import { prisma } from "../../prisma/prisma";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const salt = bcrypt.genSaltSync();
    const { email, password, firstname, lastname, avatar } = req.body;
    let user: User;
    try {
      user = await prisma.user.create({
        data: {
          email: email,
          password: bcrypt.hashSync(password, salt),
          firstname,
          lastname,
          avatar,
        },
      });
    } catch (error) {
      res.status(401).json({
        message: "A user with the same email alredy exists",
        forgotpassword: true,
      });
      return;
    }
    const token = await new jose.SignJWT(user)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt(Date.now())
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.TOKENSECRET));
    res.setHeader(
      "Set-cookie",
      cookie.serialize("T-ACCESS-TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404).json({ message: "unsupported http verb ya rayes" });
  }
}
