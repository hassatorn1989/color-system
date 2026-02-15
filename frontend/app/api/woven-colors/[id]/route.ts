import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const group = await prisma.groupFabricColor.findFirst({
    where: {
      id,
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!group) {
    return NextResponse.json(
      { message: "Woven color group not found" },
      { status: 404 }
    );
  }

  const subFabricColors = await prisma.subFabricColor.findMany({
    where: {
      group_fabric_color_id: id,
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      created_at: "asc",
    },
  });

  const subIds = subFabricColors.map((item) => item.id);

  const fabricColors =
    subIds.length === 0
      ? []
      : await prisma.fabricColor.findMany({
          where: {
            sub_fabric_color_id: {
              in: subIds,
            },
            deleted_at: null,
          },
          select: {
            id: true,
            sub_fabric_color_id: true,
            name: true,
            hex_code: true,
          },
          orderBy: {
            created_at: "asc",
          },
        });

  const fabricBySubId = new Map<string, typeof fabricColors>();
  for (const color of fabricColors) {
    const current = fabricBySubId.get(color.sub_fabric_color_id) ?? [];
    current.push(color);
    fabricBySubId.set(color.sub_fabric_color_id, current);
  }

  const data = subFabricColors.map((sub) => ({
    ...sub,
    fabricColors: fabricBySubId.get(sub.id) ?? [],
  }));

  return NextResponse.json({
    group,
    subFabricColors: data,
  });
}
