import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "unsupported http verb" });
  }
  res.setHeader(
    "Set-cookie",
    cookie.serialize("T_ACCESS_TOKEN", "deleted", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
    })
  );
  return res.end("loggedout");
};
export default logout;
