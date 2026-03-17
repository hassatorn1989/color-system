import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "วงล้อสี",
  description:
    "ทดลองจับคู่สีด้วยวงล้อสีสมัยใหม่ของ Sipator เลือก harmony หลายรูปแบบและนำไปประยุกต์กับงานผ้าทอจังหวัดพิษณุโลกได้ทันที",
  path: "/color-wheel",
  keywords: ["วงล้อสี", "color harmony", "จับคู่สีผ้าทอ", "ทฤษฎีสี"],
});

export default function ColorWheelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
