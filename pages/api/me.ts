import validateRoute from "../../lib/Auth";
import { prisma } from "../../prisma/prisma";
export default validateRoute(async (req, res, user) => {
  res.json({ ...user });
});
