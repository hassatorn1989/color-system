"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const wovenColors = await prisma.groupFabricColor.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    return NextResponse.json({ wovenColors });
}