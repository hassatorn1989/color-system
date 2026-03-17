import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "ออกแบบลวดลาย",
  description:
    "อัปโหลดหรือเลือกลวดลาย SVG จากคลังของ Sipator แล้วปรับสีหน้าและพื้นหลังเพื่อทดลองพาเลตต์ลายผ้าแบบเรียลไทม์",
  path: "/color-patterns",
  keywords: ["ลวดลายผ้า", "SVG pattern", "ออกแบบลายผ้า", "พาเลตต์ลายผ้า"],
});

export default function ColorPatternsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
