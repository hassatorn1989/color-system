import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "เกี่ยวกับเรา",
  description:
    "ทำความเข้าใจแนวคิดของ Sipator แพลตฟอร์มที่ช่วยให้การออกแบบระบบสีผ้าทอ การเรียนรู้เรื่องสี และการสร้างต้นแบบลวดลายเป็นเรื่องเข้าถึงง่ายขึ้น",
  path: "/about",
  keywords: ["เกี่ยวกับ Sipator", "แนวคิดระบบสีผ้าทอ", "แพลตฟอร์มออกแบบสี"],
});

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
