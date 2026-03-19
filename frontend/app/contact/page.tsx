import type { Metadata } from "next";
import ContactPageClient from "./contact-page-client";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "ติดต่อเรา",
  description:
    "ช่องทางติดต่อ Sipator สำหรับสอบถามการใช้งานระบบสีผ้าทอจังหวัดพิษณุโลก เครื่องมือจับคู่สี การออกแบบลวดลาย และข้อเสนอแนะเพื่อพัฒนาระบบ",
  path: "/contact",
  keywords: [
    "ติดต่อ Sipator",
    "ระบบสีผ้าทอ",
    "ผ้าทอพิษณุโลก",
    "ออกแบบลวดลายผ้า",
  ],
});

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "ติดต่อเรา | Sipator",
  url: absoluteUrl("/contact"),
  description:
    "ช่องทางติดต่อ Sipator สำหรับสอบถามการใช้งานระบบสีผ้าทอจังหวัดพิษณุโลก เครื่องมือจับคู่สี และการออกแบบลวดลาย",
  mainEntity: {
    "@type": "Organization",
    name: "Sipator",
    email: "chayanisc@nu.ac.th",
    description:
      "แพลตฟอร์มช่วยออกแบบระบบสีผ้าทอและลวดลาย โดยอ้างอิงสีที่นิยมใช้ในจังหวัดพิษณุโลก",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageClient />
    </>
  );
}
