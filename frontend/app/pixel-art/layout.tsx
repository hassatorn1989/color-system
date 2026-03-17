import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "วาดลายพิกเซล",
  description:
    "สร้างต้นแบบลวดลายพิกเซลสำหรับงานผ้า ปรับบอร์ด วาดลาย บันทึก JSON และส่งออก PNG ได้จาก Pixel Pattern Studio ของ Sipator",
  path: "/pixel-art",
  keywords: ["pixel art", "วาดลายพิกเซล", "ต้นแบบลายผ้า", "pattern studio"],
});

export default function PixelArtLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
