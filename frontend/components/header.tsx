"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { href: "/color-wheel", th: "วงล้อสี", en: "Color Wheel" },
  { href: "/color-patterns", th: "ออกแบบลวดลาย", en: "Pattern Design" },
  { href: "/woven-colors", th: "สีผ้าทอ", en: "Woven Colors" },
  { href: "/pixel-art", th: "วาดลายพิกเซล", en: "Pixel Art" },
  {
    href: "/contrast-checker",
    th: "เครื่องมือช่วยการเข้าถึง",
    en: "Accessibility Tool",
  },
  { href: "/contact", th: "สอบถามข้อมูลเพิ่มเติม", en: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between rounded-2xl border px-4 py-2 transition-all duration-300 ${
          isScrolled
            ? "border-border/80 bg-background/65 shadow-xl shadow-black/10 backdrop-blur-2xl"
            : "border-border/70 bg-background/80 shadow-lg shadow-black/5 backdrop-blur-xl"
        }`}
      >
        <Link
          href="/"
          title="ระบบสีผ้าทอจังหวัดพิษณุโลก"
          aria-label="ระบบสีผ้าทอจังหวัดพิษณุโลก"
          className="inline-flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-muted/70"
        >
          <Image
            src="/Logo.jpg"
            alt="Sipator logo"
            width={135}
            height={36}
            className="h-9 w-auto object-contain"
            priority
          />
          <span className="sr-only">Sipator</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-foreground/70 hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                <span className="block text-sm font-semibold leading-tight">
                  {item.th}
                </span>
                <span
                  className={`block text-[11px] leading-tight ${
                    isActive ? "text-primary-foreground/85" : "text-foreground/60"
                  }`}
                >
                  {item.en}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-border/70 bg-background/95 p-3 shadow-lg shadow-black/5 backdrop-blur-xl lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 transition ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/75 hover:bg-muted"
                  }`}
                >
                  <span className="block text-sm font-semibold leading-tight">
                    {item.th}
                  </span>
                  <span
                    className={`block text-[11px] leading-tight ${
                      isActive ? "text-primary-foreground/85" : "text-foreground/60"
                    }`}
                  >
                    {item.en}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
