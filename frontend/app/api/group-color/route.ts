import { PrismaClient } from "@/lib/generated/prisma";
const prisma = new PrismaClient();
export async function GET() {
    const groupColor = await prisma.groupColor.findMany({
        orderBy: { created_at: "asc" },
    });
    return new Response(JSON.stringify({ groupColor }), { status: 200 });
}