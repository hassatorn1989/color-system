import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse, type NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const groupColorId = req.nextUrl.searchParams.get("groupColorId");
    const colors = await prisma.color.findMany({
        where: groupColorId ? { group_color_id: groupColorId } : {},
        orderBy: { priority: "asc" },
    });
    return NextResponse.json({ colors }, { status: 200 });
}