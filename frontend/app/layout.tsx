import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Accessibility from "@/components/Accessibility";
import Footer from "@/components/footer";
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
  title: "Sipator",
  description: "Color system and woven palette tools for Phitsanulok textiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
