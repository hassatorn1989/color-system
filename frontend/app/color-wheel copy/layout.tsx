import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Color Wheel Copy",
  description: "หน้าทดสอบภายในสำหรับวงล้อสี",
  path: "/color-wheel%20copy",
  noIndex: true,
});

export default function ColorWheelCopyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
