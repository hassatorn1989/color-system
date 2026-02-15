"use client";

import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

const productLinks = [
  { href: "/color-wheel", label: "วงล้อสี" },
  { href: "/color-patterns", label: "ตัวปรับพาเลตต์ลายผ้า" },
  { href: "/woven-colors", label: "คลังสีผ้าทอ" },
  { href: "/contrast-checker", label: "เครื่องมือการเข้าถึง" },
];

const companyLinks = [
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อเรา" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 px-4 pb-6 pt-10">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent" />

      <div className="mx-auto max-w-7xl rounded-3xl border border-border/70 bg-card/75 p-6 shadow-lg shadow-black/5 backdrop-blur-xl md:p-8">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-2xl font-black text-transparent">
                Sipator
              </span>
            </Link>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/70">
              พื้นที่ทำงานด้านสีสำหรับสำรวจความกลมกลืนของสี พาเลตต์ผ้าทอ
              และการผสมสีที่เข้าถึงได้สำหรับทุกคน
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground/70">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>ตัดสินใจเรื่องสีได้แม่นยำและรวดเร็วขึ้น</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/75">
              เครื่องมือ
            </h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/75">
              ข้อมูล
            </h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="mailto:hello@sipator.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-foreground/70 transition hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              contact@sipator.com
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border/70 pt-4 text-xs text-foreground/60 md:flex md:items-center md:justify-between">
          <p>© {currentYear} Sipator. สงวนลิขสิทธิ์</p>
          <p className="mt-2 md:mt-0">พัฒนาเพื่อระบบสีผ้าทอร่วมสมัย</p>
        </div>
      </div>
    </footer>
  );
}
