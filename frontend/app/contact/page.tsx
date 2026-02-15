"use client"

import type React from "react"

import { useEffect, useState } from "react"
// import Navigation from "@/components/navigation"
// import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  useEffect(() => {
    document.title = "ติดต่อเรา - Sipator"
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              ติดต่อ
            </Badge><br />
            <span className="text-5xl md:text-6xl font-bold  mb-4 leading-tight text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ติดต่อเรา
            </span>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              มีคำถาม คำแนะนำ หรือข้อเสนอแนะหรือไม่ เรายินดีที่จะได้ยินจากคุณ
              ติดต่อโดยใช้แบบฟอร์มด้านล่างหรือผ่านช่องทางโซเชียลของเรา
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Information */}
            <div className="md:col-span-1 space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  อีเมล
                </h3>
                <p className="text-foreground/70">
                  <a
                    href="mailto:hello@chromalab.com"
                    className="text-primary hover:underline"
                  >
                    hello@chromalab.com
                  </a>
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  เวลาตอบสนอง
                </h3>
                <p className="text-foreground/70">
                  โดยทั่วไปเราตอบการสอบถามภายใน 24-48 ชั่วโมงในวันทำการ
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  โซเชียลมีเดีย
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/70">
                    ติดตามเราเพื่อรับเคล็ดลับสีและการอัปเดต
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition"
                    >
                      Twitter
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="text-primary hover:text-primary/80 transition"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="md:col-span-2 p-8 bg-card border-border">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    ขอบคุณ!
                  </h3>
                  <p className="text-foreground/70">
                    ข้อความของคุณได้รับการส่งสำเร็จ เราจะติดต่อกับคุณเร็ว ๆ นี้!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-foreground font-semibold mb-2 block"
                      >
                        ชื่อ
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="ชื่อของคุณ"
                        required
                        className="bg-input text-foreground placeholder:text-foreground/50 border-border"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-foreground font-semibold mb-2 block"
                      >
                        อีเมล
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-input text-foreground placeholder:text-foreground/50 border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="subject"
                      className="text-foreground font-semibold mb-2 block"
                    >
                      หัวเรื่อง
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="เรื่องนี้เกี่ยวกับอะไร?"
                      required
                      className="bg-input text-foreground placeholder:text-foreground/50 border-border"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-foreground font-semibold mb-2 block"
                    >
                      ข้อความ
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="ข้อความของคุณที่นี่..."
                      required
                      className="bg-input text-foreground placeholder:text-foreground/50 border-border min-h-40 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 transition font-semibold py-3"
                  >
                    ส่งข้อความ
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* FAQs */}
          <Card className="p-8 md:p-12 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              คำถามที่พบบ่อย
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Sipator ฟรีหรือไม่
                </h3>
                <p className="text-foreground/70">
                  ใช่! เครื่องมือและทรัพยากรทั้งหมดของเราฟรีทั้งหมด
                  เราเชื่อว่าทุกคนสมควรได้รับการเข้าถึงความรู้ทฤษฎีสี
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ฉันสามารถใช้สีจากแพลตฟอร์มของคุณในโปรเจกต์ของฉันได้หรือไม่
                </h3>
                <p className="text-foreground/70">
                  อย่างแน่นอน! สามารถใช้สีใดๆ ที่คุณค้นพบบนแพลตฟอร์มของเรา
                  เราสนับสนุนการแบ่งปันและการปรับเปลี่ยนสำหรับโครงการสร้างสรรค์
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  คุณมีบริการให้คำปรึกษาสีหรือไม่
                </h3>
                <p className="text-foreground/70">
                  ปัจจุบันเรามุ่งเน้นไปที่การจัดเตรียมเครื่องมือการศึกษาและทรัพยากร
                  สำหรับการให้คำปรึกษาแบบมืออาชีพ
                  โปรดติดต่อผ่านแบบฟอร์มติดต่อของเราเพื่อพูดคุยเกี่ยวกับความต้องการของคุณ
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  ฉันสามารถฝังเครื่องมือของคุณบนเว็บไซต์ของฉันได้หรือไม่
                </h3>
                <p className="text-foreground/70">
                  ในตอนนี้เรายังไม่มีเครื่องมือที่ฝังได้ อย่างไรก็ตาม
                  เราเปิดกว้างต่อการทำงานร่วมกัน
                  ติดต่อเราเพื่อพูดคุยเกี่ยวกับความเป็นไปได้!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
