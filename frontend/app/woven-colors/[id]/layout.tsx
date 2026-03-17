import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { createMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const group = await prisma.groupFabricColor.findUnique({
      where: { id },
      select: { name: true },
    });

    if (!group) {
      return createMetadata({
        title: "รายละเอียดสีผ้าทอ",
        description:
          "รายละเอียดกลุ่มสีผ้าทอใน Sipator พร้อมค่าสีที่นำไปใช้ต่อในการออกแบบลวดลายและระบบสีผ้าทอ",
        path: `/woven-colors/${id}`,
        noIndex: true,
      });
    }

    return createMetadata({
      title: group.name,
      description: `รายละเอียดกลุ่มสีผ้าทอ ${group.name} พร้อมค่า HEX และ HSL สำหรับนำไปใช้ต่อในงานออกแบบของ Sipator`,
      path: `/woven-colors/${id}`,
      keywords: [group.name, "รายละเอียดสีผ้าทอ", "HEX", "HSL"],
    });
  } catch {
    return createMetadata({
      title: "รายละเอียดสีผ้าทอ",
      description:
        "รายละเอียดกลุ่มสีผ้าทอใน Sipator พร้อมค่าสีที่นำไปใช้ต่อในการออกแบบลวดลายและระบบสีผ้าทอ",
      path: `/woven-colors/${id}`,
      noIndex: true,
    });
  }
}

export default function WovenColorDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
