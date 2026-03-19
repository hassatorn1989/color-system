import type { Metadata } from "next";

export const siteConfig = {
  name: "Sipator",
  description:
    "แพลตฟอร์มช่วยออกแบบระบบสีผ้าทอและลวดลาย โดยอ้างอิงสีที่นิยมใช้ในจังหวัดพิษณุโลก พร้อมเครื่องมือจับคู่สี คลังสีผ้าทอ และการตรวจสอบความคมชัด",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://sipator.com").replace(/\/$/, ""),
  ogImage: "/logo.png",
  locale: "th_TH",
};

const defaultKeywords = [
  "Sipator",
  "ระบบสีผ้าทอ",
  "ผ้าทอพิษณุโลก",
  "ออกแบบลวดลายผ้า",
  "คลังสีผ้าทอ",
  "วงล้อสี",
  "เครื่องมือจับคู่สี",
  "pixel art",
];

interface MetadataOptions {
  title?: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.siteUrl).toString();
}

export function createMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  noIndex = false,
  type = "website",
}: MetadataOptions): Metadata {
  const resolvedTitle = title || siteConfig.name;
  const fullTitle =
    resolvedTitle === siteConfig.name
      ? siteConfig.name
      : `${resolvedTitle} - ${siteConfig.name}`;
  const canonicalUrl = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(siteConfig.ogImage);

  return {
    title: resolvedTitle,
    description,
    keywords: [...new Set([...defaultKeywords, ...keywords])],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
