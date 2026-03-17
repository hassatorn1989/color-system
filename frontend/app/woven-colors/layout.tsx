import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "คลังสีผ้าทอ",
  description:
    "สำรวจคลังสีผ้าทอของ Sipator ที่รวบรวมชื่อสีและกลุ่มสีซึ่งนิยมใช้ในจังหวัดพิษณุโลก พร้อมนำค่าสีไปใช้ต่อในการออกแบบ",
  path: "/woven-colors",
  keywords: ["คลังสีผ้าทอ", "สีผ้าทอพิษณุโลก", "ค่าสีผ้าทอ", "ออกแบบสีผ้า"],
});

export default function WovenColorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
