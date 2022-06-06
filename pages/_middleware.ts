import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// import { prisma } from "../prisma/prisma";
const signedinPages = ["/"];
export default async function middleware(req: NextRequest) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.T_ACCESS_TOKEN;
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    if (!token) {
      return NextResponse.redirect(url);
    } else {
      try {
        const { payload } = await jose.jwtVerify(
          token,
          new TextEncoder().encode(process.env.TOKENSECRET)
        );
        console.log(payload);
        if (payload == null) {
          return NextResponse.redirect(url);
        }
      } catch (error) {
        console.log(error);
        return NextResponse.redirect(url);
      }
      return;
    }
  }
}
