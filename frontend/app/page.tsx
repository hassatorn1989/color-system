"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Palette,
  Sparkles,
  WandSparkles,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featureCards = [
  {
    titleTh: "วงล้อสี",
    titleEn: "วิเคราะห์ความสัมพันธ์สี",
    description:
      "วิเคราะห์ความสัมพันธ์ของสีและเลือก harmony ที่เหมาะกับงานผ้าทอร่วมสมัย",
    href: "/color-wheel",
    icon: WandSparkles,
  },
  {
    titleTh: "ตัวปรับพาเลตต์ลายผ้า",
    titleEn: "ทดลองสีบนลวดลายจริง",
    description:
      "อัปโหลด SVG ลายผ้าและเปลี่ยนโทนสีแบบทันทีเพื่อทดลองคอลเลกชันใหม่",
    href: "/color-patterns",
    icon: Palette,
  },
  {
    titleTh: "คลังสีผ้าทอพิษณุโลก",
    titleEn: "ฐานข้อมูลสีท้องถิ่น",
    description:
      "สำรวจหมวดสีหลักและเฉดสีผ้าทอย่อย พร้อมค่า HEX/HSL สำหรับใช้งานจริง",
    href: "/woven-colors",
    icon: Sparkles,
  },
  {
    titleTh: "เครื่องมือเช็คความคมชัด",
    titleEn: "มาตรฐานการเข้าถึง",
    description:
      "ตรวจสอบมาตรฐาน WCAG เพื่อให้พาเลตต์อ่านง่ายและเข้าถึงได้ทุกกลุ่มผู้ใช้",
    href: "/contrast-checker",
    icon: ShieldCheck,
  },
];

const wovenPalettes = [
  {
    name: "โทนดิน-เปลือกไม้",
    colors: ["#5C4033", "#8B5A2B", "#C68642", "#E6C79C"],
  },
  {
    name: "โทนคราม-น้ำเงิน",
    colors: ["#1E3A8A", "#1D4ED8", "#2563EB", "#93C5FD"],
  },
  {
    name: "โทนธรรมชาติทุ่งนา",
    colors: ["#365314", "#4D7C0F", "#84CC16", "#F7FEE7"],
  },
  {
    name: "โทนงานพิธีพื้นถิ่น",
    colors: ["#7F1D1D", "#B91C1C", "#E11D48", "#FECDD3"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "เก็บแรงบันดาลใจสี",
    desc: "เริ่มจากโทนสีผ้าทอพื้นถิ่นและวัสดุธรรมชาติในจังหวัดพิษณุโลก",
  },
  {
    number: "02",
    title: "สร้างระบบสี",
    desc: "ใช้วงล้อสีเพื่อวางความสัมพันธ์ระหว่างสีหลัก สีรอง และสีเน้น",
  },
  {
    number: "03",
    title: "ทดลองบนลวดลายจริง",
    desc: "ปรับพาเลตต์ในตัวปรับพาเลตต์เพื่อดูผลกับลวดลาย SVG แบบเรียลไทม์",
  },
  {
    number: "04",
    title: "ตรวจสอบการเข้าถึง",
    desc: "ปิดท้ายด้วยเครื่องมือเช็คความคมชัดให้พร้อมใช้งานทั้งสิ่งพิมพ์และดิจิทัล",
  },
];

export default function Home() {
  useEffect(() => {
    document.title = "หน้าแรก - Sipator";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <section className="mb-14">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                จังหวัดพิษณุโลก
              </Badge>
              <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
                ระบบสีเพื่อผ้าทอ
                <br />
                มรดกภูมิปัญญาท้องถิ่น
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                แพลตฟอร์มวิเคราะห์และพัฒนาระบบสีผ้าทอจังหวัดพิษณุโลก
                เพื่อเชื่อมงานหัตถกรรมดั้งเดิมเข้ากับงานออกแบบร่วมสมัยอย่างมีทิศทาง
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/woven-colors">
                    สำรวจคลังสีผ้าทอ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/color-patterns">เปิดตัวปรับพาเลตต์</Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="mb-14 grid gap-4 md:grid-cols-3">
            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                จุดมุ่งหมาย
              </p>
              <p className="mt-2 text-lg font-semibold">รักษาอัตลักษณ์สีท้องถิ่น</p>
              <p className="mt-2 text-sm text-foreground/70">
                รักษาอัตลักษณ์สีพื้นถิ่นให้พร้อมใช้งานต่อในงานแบรนด์และงานผลิตภัณฑ์
              </p>
            </Card>
            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                ข้อมูลเชิงระบบ
              </p>
              <p className="mt-2 text-lg font-semibold">พร้อมใช้แบบ HEX / HSL</p>
              <p className="mt-2 text-sm text-foreground/70">
                ทุกเฉดสีถูกจัดให้อยู่ในโครงสร้างที่นำไปใช้กับเว็บ แอป และงานพิมพ์ได้ทันที
              </p>
            </Card>
            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                แนวทางใช้งาน
              </p>
              <p className="mt-2 text-lg font-semibold">จากหัตถกรรมสู่งานดิจิทัล</p>
              <p className="mt-2 text-sm text-foreground/70">
                จากแรงบันดาลใจผ้าทอ สู่งานออกแบบที่ตรวจสอบ contrast และใช้งานจริงได้
              </p>
            </Card>
          </section>

          <section className="mb-14">
            <div className="mb-4">
              <h2 className="text-2xl font-bold md:text-3xl">
                เครื่องมือหลักของแพลตฟอร์ม
              </h2>
              <p className="mt-2 text-foreground/70">
                ครอบคลุมการสำรวจสี ทดลองลวดลาย และตรวจสอบคุณภาพการใช้งาน
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {featureCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.href}
                    className="group border-border/70 bg-card/80 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="mb-3 inline-flex rounded-lg border border-border/70 bg-background/80 p-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {item.titleTh}
                    </h3>
                    <p className="text-sm text-foreground/60">{item.titleEn}</p>
                    <p className="mt-3 text-sm text-foreground/70">{item.description}</p>
                    <Button asChild variant="ghost" className="mt-3 px-0">
                      <Link href={item.href} className="gap-2">
                        เปิดเครื่องมือ
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="mb-14 rounded-2xl border border-border/70 bg-card/75 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold md:text-3xl">ตัวอย่างพาเลตต์สีผ้าทอ</h2>
            <p className="mt-2 text-foreground/70">
              โทนสีตัวอย่างที่สะท้อนวัสดุ วิถีชีวิต และบรรยากาศของพื้นที่
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {wovenPalettes.map((palette) => (
                <div
                  key={palette.name}
                  className="rounded-xl border border-border/70 bg-background/70 p-4"
                >
                  <p className="mb-3 text-sm font-semibold">{palette.name}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {palette.colors.map((color) => (
                      <div key={color}>
                        <div
                          className="h-12 rounded-md border border-border/60"
                          style={{ backgroundColor: color }}
                        />
                        <p className="mt-1 text-[11px] text-foreground/65">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold md:text-3xl">ขั้นตอนการใช้งานแนะนำ</h2>
            <p className="mt-2 text-foreground/70">
              เริ่มใช้งานแพลตฟอร์มอย่างเป็นลำดับเพื่อให้ได้ผลลัพธ์ที่สม่ำเสมอ
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {processSteps.map((step) => (
                <Card
                  key={step.number}
                  className="border-border/70 bg-card/80 p-5 backdrop-blur"
                >
                  <p className="text-xs font-semibold tracking-wide text-primary">
                    ขั้นตอนที่ {step.number}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm text-foreground/70">{step.desc}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border/70 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-7 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              เริ่มสร้างระบบสีผ้าทอพิษณุโลกของคุณ
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              ใช้คลังสี ลองพาเลตต์กับลวดลายจริง และตรวจสอบความคมชัดให้พร้อมใช้งานระดับผลิตภัณฑ์
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/color-wheel">
                  เริ่มจากวงล้อสี
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">ติดต่อเพื่อพัฒนาต่อยอด</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
