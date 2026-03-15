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
      "นําทฤษฏีการจับคู่สีแบบต่างๆ มาประยุกต์ ใช้กับสีผ้าทอ จังหวัดพิษณุโลก",
    href: "/color-wheel",
    icon: WandSparkles,
  },
  {
    titleTh: "ออกแบบลวดลาย",
    titleEn: "ทดลองสีบนลวดลายจริง",
    description:
      "ทดลองจับคู่สีผ้าจากลวดลายจริง โดยการอัปโหลดไฟล์ SVG และทดลองออกแบบลายผ้าผ่านเครื่องมือสร้างลวดลาย",
    href: "/color-patterns",
    icon: Palette,
  },
  {
    titleTh: "คลังสีผ้าทอ",
    titleEn: "ฐานข้อมูลสีท้องถิ่น",
    description:
      "รวบรวมสีผ้าทอ ประเภทต่างๆ ที่กลุ่มผ้าทอจังหวัดพิษณุโลกนิยมใช้ โดยนํามีเทียบค่าสีซึ่งอาจจะมีความคลาดเคลื่อนจากสีจริง 15-30% สามารถคัดลอกค่าสี เพื่อนํามาจับคู่สีภายในแพลตฟอร์ม เพื่อเป็นต้นแบบก่อนนําไปพัฒนาต่อ",
    href: "/woven-colors",
    icon: Sparkles,
  },
  {
    titleTh: "เครื่องมือเช็คความคมชัด",
    titleEn: "มาตรฐานการเข้าถึง",
    description:
      "ตรวจสอบมาตรฐานความคมชัด WCAG สามารถนํามาใช้ ในการออกแบบดูค่าคอนทราสสีของลวดลายกับพืนหลัง",
    href: "/contrast-checker",
    icon: ShieldCheck,
  },
];

const wovenPalettes = [
  {
    name: "คู่สีข้างเคียง (Analogous) แสดงถึงความไหลลื่นกลมกลืน",
    colors: ["#cf6e4c", "#e9b644", "#d17a3f"],
  },
  {
    name: "สีสี่เหลี่ยมจัตุรัส ( Square ) แสดงถึงสมดุลอ",
    colors: ["#7d2f86", "#cf7a3f", "#3e8e85", "#57844A"],
  },
  {
    name: "สีสี่เหลี่ยมผืนผ้า(Tetradic) เหมาะงานที่ต้องการสีที่หลากหลาย",
    colors: ["#EED555", "#3E8D87", "#4F4095", "#D07A3F"],
  },
  {
    name: "สีเอกรงค์ (Monochromatic) เพื่อสร้างความกลมกลืน และความเป็นอันหนึ่งอันเดียวกัน",
    colors: ["#58341C", "#95552F", "#D07A3F", "#E1B189"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "จับคู่สีผ้าทอเพื่อเลือกสีไหม",
    desc: "เริ่มจากการเลือกโทนสีผ้า จับคู่สีและ เลือกสีย้อมผ้าตามเฉดสีในหน้าสีผ้าทอ",
  },
  {
    number: "02",
    title: "สร้างระบบสี",
    desc: "ใช้วงล้อสีโดยเลือกตามสีของไหมชนิดต่างๆ โดยใช้ทฤษฎีสีคู่ตรงข้าม หรือการจับคู่สีข้างเขียงพร้อมทั้งดูเปอร์เซ็นการใช้สีในการออกแบบ",
  },
  {
    number: "03",
    title: "ทดลองออกแบบลวดลาย และจับคู่สี",
    desc: "ผู้ออกแบบสามารถทดลองจับคู่สีในลวดลายที่มี ให้เลือก สร้างลวดลายขึนมาใหม่หรืออัพโหลดไฟล์ SVG เพื่อทดลองจับคู่สี",
  },
  {
    number: "04",
    title: "สีผ้าทอ",
    desc: "สีย้อมไหมชนิดและยี่ห้อต่างๆ ที่นิยมนํามาย้อมไหมได้ถูกรวบรวมไว้ โดยการเทียบค่าสีจากเส้นไหมที่ย้อมแล้วจากทางร้าน สามารถนําค่าสีไปใช้ ในการออกแบบ โดยค่าสีอาจจะมีความคลาดเคลื่อนไป 15-30%",
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
              <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-2xl font-black leading-tight text-transparent md:text-3xl">
                ระบบการจับคู่สีเพื่อการออกแบบผ้าทอ และผลิตภัณฑ์จากผ้าทอ
                <br />
                การออกแบบลวดลายผ้าทอ จากมรดกภูมิญญาท้องถิ่น
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
                แพลตฟอร์มที่ช่วยในการออกแบบผลิตภัณฑ์ผ้าทอ โดยนําสีผ้าทอที่
                นิยมใช้ในจังหวัดพิษณุโลก มาใช้ร่วมกับทฤษฎีที่ช่วยในการจับคู่สี
                แบ่งปริมาณการใช้สี
                และทดลองออกแบบลายผ้าทอเพื่อให้ผู้ออกแบบมีต้นแบบในการนําไปพัฒนาต่อยอดเป็นผลิตภัณฑ์ต่อไป
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/woven-colors">
                    สำรวจคลังสีผ้าทอ
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {/* <Button asChild size="lg" variant="outline">
                  <Link href="/color-patterns">เปิดตัวปรับพาเลตต์</Link>
                </Button> */}
              </div>
            </div>
          </section>

          <section className="mb-14 grid gap-4 md:grid-cols-3">
            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                สีผ้าทอ
              </p>
              <p className="mt-2 text-lg font-semibold">
                รักษาอัตลักษณ์สีท้องถิ่น
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                คัดเลือกสีที่กลุ่มผ้าทอจังหวัดพิษณุโลกนิยมใช้ย้อมเส้นด้าย
                โดยแบ่งตามประเภทของเส้นด้าย เช่น ไหม ไหมประดิษฐ์ และฝ้าย
              </p>
            </Card>
            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                นําสีไปใช้ในการออกแบบ
              </p>
              <p className="mt-2 text-lg font-semibold">
                ค่าสี HEX / HSL / RGB
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                ทุกเฉดสีสามารถนําออกไปใช้กับการออกแบบในรูปแบบต่างๆ ทั้งงานสื่อ
                ดิจิตอล และงานสิ่งพิมพ์ เพียงแค่กดคัดลอกค่าสี ก็สามารถนําไปใช้
                ได้ทันที
              </p>
            </Card>
            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                ช่วยในการออกแบบต้นแบบเบืองต้น
              </p>
              <p className="mt-2 text-lg font-semibold">
                ช่วยในการสร้างลวดลาย และจับคู่สี
              </p>
              <p className="mt-2 text-sm text-foreground/70">
                จากแรงบันดาลใจสู่การพัฒนาต้นแบบผลิตภัณฑ์ผ้าทอ
                แพลตฟอร์มสามารถใช้ช่วยผู้ออกแบบจับคู่สีผ้าทอ และสร้างแพทเทิล
                ลวดลายผ้าทอ เบื้องต้นได้
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
                    <p className="mt-3 text-sm text-foreground/70">
                      {item.description}
                    </p>
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
            <h2 className="text-2xl font-bold md:text-3xl">
              ตัวอย่างการจับคู่สีและปริมาณการใช้สี
            </h2>
            {/* <p className="mt-2 text-foreground/70">
              โทนสีตัวอย่างที่สะท้อนวัสดุ วิถีชีวิต และบรรยากาศของพื้นที่
            </p> */}
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
                        <p className="mt-1 text-[11px] text-foreground/65">
                          {color}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-bold md:text-3xl">
              ขั้นตอนการใช้งานเพื่อการออกแบบเบื้องต้น
            </h2>
            <p className="mt-2 text-foreground/70">
              เริ่มใช้งานแพลตฟอร์มอย่างเป็นลำดับเพื่อให้ได้ผลลัพธ์ที่น่าสนใจ
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

          {/* <section className="rounded-2xl border border-border/70 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-7 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              เริ่มสร้างระบบสีผ้าทอพิษณุโลกของคุณ
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-foreground/70">
              ใช้คลังสี ลองพาเลตต์กับลวดลายจริง
              และตรวจสอบความคมชัดให้พร้อมใช้งานระดับผลิตภัณฑ์
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
          </section> */}
        </div>
    </main>
    </div>
  );
}
