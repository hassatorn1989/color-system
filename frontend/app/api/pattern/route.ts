"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

export async function GET() {
  try {
    const patterns = await prisma.pattern.findMany({
      select: {
        id: true,
        name: true,
        file_name: true,
        file_path: true,
      },
    });
    return NextResponse.json({
      patterns,
    });
  } catch (error) {
    console.error("Error fetching patterns:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch patterns",
      },
      { status: 500 }
    );
  }
}