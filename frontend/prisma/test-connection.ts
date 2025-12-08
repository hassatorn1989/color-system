import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to DB!");
    const res = await prisma.$queryRaw`SELECT 1 as result`;
    console.log("Query result:", res);
  } catch (err) {
    console.error("❌ Prisma failed to connect:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
