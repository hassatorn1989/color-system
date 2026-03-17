import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contrast Checker Test",
  description: "หน้าทดสอบภายในสำหรับ contrast checker",
  path: "/contrast-checkerxx",
  noIndex: true,
});

export default function ContrastCheckerTestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
