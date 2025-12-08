import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: "mysql",
});

export default prisma;
