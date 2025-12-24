"use server";
import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();
export async function GET() {
  try {
    const groupColor = await prisma.groupColor.findMany({
      orderBy: { created_at: "asc" },
    });
    return new Response(JSON.stringify({ groupColor }), { status: 200 });
  } catch (error) {
    console.error('Prisma query error:', error);
    return new Response("Error fetching group colors :" + error, { status: 500 });
  }
}
