import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Accessibility from "@/components/Accessibility";
import Footer from "@/components/footer";
import { absoluteUrl, siteConfig } from "@/lib/seo";
const notoSansThai = localFont({
  src: [
    {
      path: "./fonts/NotoSansThai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansThai-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: `หน้าแรก - ${siteConfig.name}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sipator",
    "ระบบสีผ้าทอจังหวัดพิษณุโลก",
    "คลังสีผ้าทอ",
    "ออกแบบลวดลายผ้า",
    "วงล้อสี",
    "เครื่องมือจับคู่สี",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`${notoSansThai.className} antialiase`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="accessibility-app-root">
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </div>
          <Accessibility />
        </ThemeProvider>
      </body>
    </html>
  );
}
