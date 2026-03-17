import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "ตรวจสอบความคมชัด",
  description:
    "ตรวจสอบอัตราส่วนความคมชัดของสีตามมาตรฐาน WCAG เพื่อช่วยให้งานออกแบบผ้าทอและสื่อดิจิทัลของคุณเข้าถึงได้มากขึ้น",
  path: "/contrast-checker",
  keywords: ["WCAG", "contrast checker", "ตรวจสอบความคมชัด", "accessibility"],
});

export default function ContrastCheckerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
