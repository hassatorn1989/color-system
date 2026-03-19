"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactHighlights = [
  {
    title: "อีเมลสำหรับติดต่อ",
    description:
      "สอบถามการใช้งานระบบ แจ้งข้อเสนอแนะ หรือส่งข้อมูลเพื่อพัฒนาฟีเจอร์ต่อได้ที่อีเมลหลักของโครงการ",
    value: "contact@sipator.com",
    href: "mailto:contact@sipator.com",
    icon: Mail,
  },
  {
    title: "ขอบเขตของแพลตฟอร์ม",
    description:
      "Sipator มุ่งช่วยงานออกแบบสีผ้าทอและลวดลาย โดยอ้างอิงสีที่นิยมใช้ในจังหวัดพิษณุโลกและเครื่องมือจับคู่สี",
    value: "ระบบสีผ้าทอจังหวัดพิษณุโลก",
    href: "/about",
    icon: MapPin,
  },
  // {
  //   title: "เวลาตอบกลับ",
  //   description:
  //     "หากเป็นคำถามทั่วไปหรือข้อเสนอแนะเกี่ยวกับระบบ เราจะพยายามตอบกลับภายในเวลาทำการให้เร็วที่สุด",
  //   value: "ประมาณ 24-48 ชั่วโมง",
  //   href: "",
  //   icon: Clock3,
  // },
] as const;

const faqItems = [
  {
    question: "ติดต่อ Sipator ได้เรื่องอะไรบ้าง",
    answer:
      "สามารถติดต่อได้ทั้งเรื่องการใช้งานวงล้อสี คลังสีผ้าทอ เครื่องมือออกแบบลวดลาย การตรวจสอบความคมชัด รวมถึงข้อเสนอแนะเพื่อพัฒนาระบบให้เหมาะกับการออกแบบผ้าทอมากขึ้น",
  },
  {
    question: "ข้อมูลสีในระบบตรงกับสีจริงทั้งหมดหรือไม่",
    answer:
      "ค่าสีในระบบถูกจัดทำเพื่อช่วยออกแบบและทดลองจับคู่สีเบื้องต้น โดยสีจริงของวัสดุหรือเส้นด้ายอาจมีความคลาดเคลื่อนได้ประมาณ 15-30% ตามที่ระบุไว้ในหน้าหลักของแพลตฟอร์ม",
  },
  {
    question: "สามารถเสนอฟีเจอร์ใหม่หรือส่งตัวอย่างลายผ้าได้หรือไม่",
    answer:
      "ได้ หากคุณมีตัวอย่างลวดลาย แนวทางการใช้งาน หรืออยากเสนอฟีเจอร์ที่ช่วยให้การออกแบบสีผ้าทอสะดวกขึ้น สามารถส่งรายละเอียดเข้ามาผ่านแบบฟอร์มนี้ได้เลย",
  },
  {
    question: "มีบริการให้คำปรึกษางานออกแบบเฉพาะทางหรือไม่",
    answer:
      "ปัจจุบันแพลตฟอร์มเน้นเป็นเครื่องมือช่วยสำรวจสีและต้นแบบการออกแบบก่อน หากมีความต้องการเฉพาะทาง สามารถติดต่อเข้ามาเพื่อพูดคุยขอบเขตความร่วมมือได้",
  },
] as const;

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    window.setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-28 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <section className="mx-auto mb-12 max-w-4xl text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              <MessageSquareText className="mr-2 h-4 w-4" />
              ติดต่อทีมงาน Sipator
            </Badge>
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
              พูดคุยเรื่องระบบสีผ้าทอและการออกแบบลวดลายได้ที่นี่
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
              หากคุณมีคำถามเกี่ยวกับการใช้งานแพลตฟอร์ม ต้องการเสนอแนะการพัฒนา
              หรืออยากแลกเปลี่ยนแนวทางการนำเครื่องมือไปใช้กับงานผ้าทอของจังหวัดพิษณุโลก
              สามารถส่งข้อความถึงเราได้โดยตรงจากหน้านี้
            </p>
          </section>

          <section className="mb-8 grid gap-4 md:grid-cols-2">
            {contactHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur"
                >
                  <div className="mb-4 inline-flex rounded-xl border border-border/70 bg-background/80 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {item.description}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80"
                    >
                      {item.value}
                      {item.href.startsWith("/") ? (
                        <ArrowRight className="h-4 w-4" />
                      ) : null}
                    </a>
                  ) : (
                    <p className="mt-4 text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  )}
                </Card>
              );
            })}
          </section>
          <div className="mb-8 w-full text-center">
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-foreground/70 md:text-lg">
              แพลตฟอร์มนี้เป็นส่วนหนึ่งของงานวิจัย
              เรื่องการออกแบบและพัฒนาเครื่องมือสำหรับช่วยงานออกแบบผลิตภัณฑ์ชุมชน
              โดยใช้ทุนทาง วัฒนธรรม และภูมิปัญญาท้องถิ่น :
              กรณีศึกษากลุ่มผ้าทอมือ จังหวัดพิษณุโลก
            </p>
          </div>
          <section className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <Card className="border-border/70 bg-card/80 p-8 shadow-sm backdrop-blur">
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 p-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    ส่งข้อความเรียบร้อยแล้ว
                  </h2>
                  <p className="mt-3 max-w-md text-foreground/70">
                    ขอบคุณที่ติดต่อ Sipator เราได้รับข้อความของคุณแล้ว
                    และจะพยายามตอบกลับโดยเร็วที่สุด
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">ส่งข้อความถึงเรา</h2>
                    <p className="mt-2 text-foreground/70">
                      ใช้แบบฟอร์มนี้สำหรับคำถามเกี่ยวกับการใช้งานระบบ ข้อเสนอแนะ
                      หรือการประสานงานด้านข้อมูลและลวดลาย
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">ชื่อผู้ติดต่อ</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ชื่อของคุณ"
                        required
                        className="bg-background/80"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@example.com"
                        required
                        className="bg-background/80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">หัวข้อ</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="เช่น สอบถามการใช้งานคลังสีผ้าทอ"
                      required
                      className="bg-background/80"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">รายละเอียด</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="บอกรายละเอียดคำถามหรือข้อเสนอแนะของคุณได้ที่นี่"
                      required
                      className="min-h-40 resize-none bg-background/80"
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2 sm:w-auto">
                    <MessageSquareText className="h-4 w-4" />
                    ส่งข้อความ
                  </Button>
                </form>
              )}
            </Card>

            <div className="space-y-6">
              <Card className="border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur">
                <h2 className="text-xl font-semibold">
                  ติดต่อเรื่องไหนได้บ้าง
                </h2>
                <div className="mt-4 space-y-3 text-sm text-foreground/70">
                  <p>
                    1. งานวิจัยที่เกียวข้องกับการสร้างแพลตฟอร์ม
                    หรือตามทฤฎีที่ใช้ด้านการออกแบบ
                  </p>
                  <p>2. การใช้งานวงล้อสีและการจับคู่สีสำหรับงานผ้าทอ</p>
                  <p>3. การใช้งานคลังสีผ้าทอและการคัดลอกค่าสีไปออกแบบต่อ</p>
                  <p>
                    4. การทดลองออกแบบลวดลายด้วยเครื่องมือ pattern และ pixel art
                  </p>
                  <p>
                    5. ข้อเสนอแนะเพื่อปรับปรุงข้อมูลหรือขยายฟีเจอร์ของแพลตฟอร์ม
                  </p>
                  <p>
                    6. ทางเว็บไซต์เป็นการรวบรวมค่าสีที่ได้มาจากสีย้อมผ้ายี่ห้อต่าง ๆ โดยมไ่มีตัวแทนจำหน่าย
                  </p>
                </div>
              </Card>

              <Card className="border-border/70 bg-gradient-to-br from-primary/8 via-secondary/10 to-accent/10 p-6 shadow-sm">
                <h2 className="text-xl font-semibold">
                  เครื่องมือที่เกี่ยวข้อง
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  หากต้องการทดลองใช้งานก่อนส่งคำถาม
                  คุณสามารถเริ่มจากเครื่องมือหลักของระบบได้ทันที
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/color-wheel">วงล้อสี</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/color-patterns">ออกแบบลวดลาย</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/woven-colors">คลังสีผ้าทอ</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/contrast-checker">ตรวจสอบความคมชัด</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          <section>
            <Card className="border-border/70 bg-card/80 p-8 shadow-sm backdrop-blur md:p-10">
              <h2 className="text-2xl font-bold">คำถามที่พบบ่อย</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {faqItems.map((item) => (
                  <div key={item.question}>
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
