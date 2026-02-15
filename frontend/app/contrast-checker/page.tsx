"use client"

import { useEffect, useState } from "react"
// import Navigation from "@/components/navigation"
// import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Triangle, Square, Circle } from "lucide-react"

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map((x) => {
    x = x / 255
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

const getContrastRatio = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return 0

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

const getWcagLevel = (ratio: number) => {
  if (ratio >= 7) return { level: "AAA", text: "ความเคาน์เทสต์ที่ปรับปรุง (AAA)" }
  if (ratio >= 4.5) return { level: "AA", text: "ความเคาน์เทสต์ที่ปรับปรุง (AA)" }
  if (ratio >= 3) return { level: "A", text: "ความเคาน์เทสต์ขั้นต่ำ (A)" }
  return { level: "Fail", text: "ไม่ตรงตามมาตรฐาน" }
}

export default function ContrastCheckerPage() {
  useEffect(() => {
    document.title = "ตรวจสอบความคมชัด - Sipator"
  }, [])

  const [foreground, setForeground] = useState("#1F2937")
  const [background, setBackground] = useState("#F3F4F6")

  const ratio = getContrastRatio(foreground, background)
  const wcag = getWcagLevel(ratio)

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              ความเข้าถึง
            </Badge><br />
            <span className="text-5xl md:text-6xl font-bold  mb-4 leading-tight text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ตรวจสอบความคม
            </span>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              ตรวจสอบให้แน่ใจว่าการผสมผสานสีของคุณตรงตามมาตรฐานความเข้าถึง WCAG
              ตรวจสอบอัตราส่วนความเคาน์เทสต์ระหว่างสีข้อความและพื้นหลังเพื่อให้การออกแบบของคุณสามารถเข้าถึงได้สำหรับทุกคน
            </p>
          </div>

          {/* Main Checker */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 ">
            {/* Input Section */}
            <Card className="p-8 bg-card border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">
                การเลือกสี
              </h3>
              <div className="space-y-6">
                {/* Foreground Color */}
                <div>
                  <Label className="text-foreground font-semibold mb-3 block">
                    สีข้อความ / สีพื้นหน้า
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      type="color"
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                      className="w-20 h-12 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={foreground.toUpperCase()}
                      onChange={(e) => setForeground(e.target.value)}
                      className="flex-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <Label className="text-foreground font-semibold mb-3 block">
                    สีพื้นหลัง
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                      className="w-20 h-12 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={background.toUpperCase()}
                      onChange={(e) => setBackground(e.target.value)}
                      className="flex-1"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <Button
                  onClick={() => {
                    const temp = foreground;
                    setForeground(background);
                    setBackground(temp);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  สลับสี
                </Button>
              </div>
            </Card>

            {/* Preview Section */}
            <div className="space-y-6">
              {/* Live Preview */}
              <Card className="overflow-hidden border-border">
                <div
                  className="p-8 text-center transition-all"
                  style={{ color: foreground, backgroundColor: background }}
                >
                  <p className="text-sm mb-2">ตัวอย่างข้อความ</p>
                  <h3 className="text-4xl font-bold mb-4">Aa</h3>
                  <p className="text-sm">
                    สุนัขจิ้งจอกสีน้ำตาลที่รวดเร็วกระโดดข้ามสุนัขเกียจคร่านที่นอนหลับ
                  </p>
                </div>
              </Card>

              {/* Shape Contrast Preview */}
              <Card className="overflow-hidden border-border">
                <div
                  className="p-8 transition-all"
                  style={{ color: foreground, backgroundColor: background }}
                >
                  <p className="text-sm mb-4 text-center">Icon contrast preview</p>
                  <div className="flex items-center justify-center gap-8">
                    <div className="flex flex-col items-center gap-2">
                      <Triangle className="h-12 w-12" />
                      <span className="text-xs">Triangle</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Square className="h-12 w-12" />
                      <span className="text-xs">Square</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Circle className="h-12 w-12" />
                      <span className="text-xs">Circle</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Results */}
              <Card className="p-6 bg-card border-border">
                <h4 className="font-semibold text-foreground mb-4">
                  อัตราส่วนความเคาน์เทสต์
                </h4>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {ratio.toFixed(2)}:1
                  </div>
                  <Badge
                    variant={
                      wcag.level === "AAA"
                        ? "default"
                        : wcag.level === "AA"
                        ? "secondary"
                        : "destructive"
                    }
                    className="inline-block"
                  >
                    {wcag.text}
                  </Badge>
                </div>
              </Card>
            </div>
          </div>

          {/* Standards Information */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                WCAG AA
              </h4>
              <p className="text-sm text-foreground/70 mb-4">
                มาตรฐานที่แนะนำสำหรับความเข้าถึงเว็บ
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>• ข้อความปกติ: 4.5:1</li>
                <li>• ข้อความขนาดใหญ่: 3:1</li>
              </ul>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                WCAG AAA
              </h4>
              <p className="text-sm text-foreground/70 mb-4">
                ความเข้าถึงที่ปรับปรุงแล้วเพื่อให้เข้าถึงได้สูงสุด
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>• ข้อความปกติ: 7:1</li>
                <li>• ข้อความขนาดใหญ่: 4.5:1</li>
              </ul>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                ความบ่วงตาสีบอด
              </h4>
              <p className="text-sm text-foreground/70 mb-4">
                พิจารณาประเภทต่างๆของความบกพร่องในการมองเห็นสี
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>• อย่าพึ่งพาสีเพียงอย่างเดียว</li>
                <li>• ใช้ลวดลายหรือไอคอน</li>
              </ul>
            </Card>
          </div>

          {/* Tips */}
          <Card className="p-8 bg-card border-border">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              เคล็ดลับความเข้าถึง
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">ที่ควรทำ</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✓ ใช้ความเคาน์เทสต์สีที่เพียงพอ</li>
                  <li>✓ ทดสอบโดยใช้เครื่องมือเช่นนี้</li>
                  <li>✓ พิจารณาความบกพร่องในการมองเห็นหลายสี</li>
                  <li>✓ ใช้ข้อความขนาดใหญ่เพื่อความเคาน์เทสต์ต่ำ</li>
                  <li>✓ รวมสีกับรูปแบบ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">ไม่ควรทำ</h4>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>✗ พึ่งพาสีเพียงเพื่ออธิบายความหมาย</li>
                  <li>✗ ใช้สีแดงและเขียวร่วมกันสำหรับข้อมูลที่สำคัญ</li>
                  <li>✗ ลืมทดสอบการผสมผสาน</li>
                  <li>✗ ใช้ความเคาน์เทสต์ต่ำสำหรับเนื้อหาที่สำคัญ</li>
                  <li>✗ มองข้ามมาตรฐานความเข้าถึง</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
