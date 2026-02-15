"use client"

// import Navigation from "@/components/navigation"
// import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect } from "react"

export default function AboutPage() {
  useEffect(() => {
    document.title = "เกี่ยวกับเรา - Sipator"
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              เกี่ยวกับเรา
            </Badge><br />
            <span className="text-5xl md:text-6xl font-bold  mb-4 leading-tight text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ทำความเข้าใจทฤษฎีสี
            </span>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              Sipator
              มุ่งมั่นที่จะทำให้ทฤษฎีสีเข้าถึงได้และใช้งานได้จริงสำหรับนักออกแบบ
              ศิลปิน และใครก็ตามที่สนใจวิทยาศาสตร์และศิลปะของสี
            </p>
          </div>

          {/* Mission Section */}
          <Card className="p-8 md:p-12 bg-card border-border mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              พันธกิจของเรา
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-6">
              เราเชื่อว่าการทำความเข้าใจทฤษฎีสีไม่ควรซับซ้อนหรือน่ากลัว
              ไม่ว่าคุณจะเป็นนักออกแบบมืออาชีพหรือคนที่เพิ่งเริ่มสำรวจสี
              แพลตฟอร์มของเราจัดเตรียมเครื่องมือ ความรู้
              และทรัพยากรที่คุณต้องการเพื่อตัดสินใจเกี่ยวกับสีอย่างเป็นข้อมูล
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              สีเป็นภาษาสากลที่มีอิทธิพลต่ออารมณ์ สื่อสารข้อความ
              และนำพาความเข้าใจของเราเกี่ยวกับโลก ด้วยการทำให้ทฤษฎีสีเข้าถึงได้
              เราให้อำนาจให้ผู้สร้างต่างๆ
              บอกเล่าเรื่องราวที่ดีขึ้นผ่านงานของพวกเขา
            </p>
          </Card>

          {/* What We Offer */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              สิ่งที่เราจัดเตรียม
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  เครื่องมือแบบโต้ตอบ
                </h3>
                <p className="text-foreground/70">
                  สำรวจวงจรสี ทดสอบแบบรูปสี
                  และตรวจสอบอัตราส่วนความเคาน์เทสต์ด้วยเครื่องมือภาพเหนือธรรมชาติของเรา
                </p>
              </Card>

              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  เนื้อหาการศึกษา
                </h3>
                <p className="text-foreground/70">
                  เรียนรู้พื้นฐานของทฤษฎีสี
                  ตั้งแต่สีหลักไปจนถึงเทคนิคความสามัคคีขั้นสูง
                </p>
              </Card>

              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  ข้อมูลเชิงลึกของจิตวิทยา
                </h3>
                <p className="text-foreground/70">
                  ทำความเข้าใจวิธีที่สีกระทบต่อการรับรู้มนุษย์และอารมณ์
                  และวิธีใช้ประโยชน์จากความรู้นี้ในการออกแบบ
                </p>
              </Card>

              <Card className="p-6 bg-card border-border hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  โฟกัสความเข้าถึง
                </h3>
                <p className="text-foreground/70">
                  เรียนรู้เกี่ยวกับมาตรฐาน WCAG
                  และการพิจารณาความบ่วงตาสีเพื่อสร้างการออกแบบที่เป็นรวม
                </p>
              </Card>
            </div>
          </div>

          {/* Color Theory Basics */}
          <Card className="p-8 md:p-12 bg-card border-border mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              วิทยาศาสตร์เบื้องหลังสี
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  แสงและความยาวคลื่น
                </h3>
                <p className="text-foreground/70">
                  สีถูกสร้างจากคลื่นแสงที่มีความยาวคลื่นต่างกัน
                  ตาของเรารับรู้ความยาวคลื่นเหล่านี้เป็นสีต่างกัน
                  สเปกตรัมแสงที่มองเห็นได้มีตั้งแต่ประมาณ 380 นาโนเมตร (ไวโอเลต)
                  ถึง 700 นาโนเมตร (แดง)
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  แบบสีสัน
                </h3>
                <p className="text-foreground/70">
                  แบบสีต่างๆ เช่น RGB (เสริม) CMYK (ลบ) และ HSL
                  แทนสีในรูปแบบต่างๆ
                  แต่ละแบบจำหน่ายวัตถุประสงค์ที่แตกต่างกัน—RGB สำหรับหน้าจอ CMYK
                  สำหรับการพิมพ์ และ HSL สำหรับสัญชาตญาณของมนุษย์
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  ความสามัคคีของสี
                </h3>
                <p className="text-foreground/70">
                  สีที่ทำงานร่วมกันได้ดีติดตามความสัมพันธ์ทางคณิตศาสตร์ในวงจรสี
                  การผสมผสานที่ลงตัวเหล่านี้สร้างประสบการณ์ทางภาพที่น่าพอใจและสื่อสารอารมณ์และข้อความเฉพาะ
                </p>
              </div>
            </div>
          </Card>

          {/* Why Color Matters */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              ทำไมสีถึงสำคัญ
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  ผลกระทบด้านอารมณ์
                </h3>
                <p className="text-sm text-foreground/70">
                  สีกระตุ้นการตอบสนองด้านอารมณ์ สีแดงก่อให้เกิดพลัง
                  สีน้ำเงินแสดงให้เห็นความสงบ และสีเขียวชี้ให้เห็นการเจริญเติบโต
                  การเลือกสีที่เหมาะสมจะช่วยเสริมข้อความของคุณ
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-secondary mb-3">
                  การรับรู้แบรนด์
                </h3>
                <p className="text-sm text-foreground/70">
                  แบรนด์ที่มีชื่อเสียงมักรู้จักด้วยสีเพียงอย่างเดียว
                  ตัวเลือกสีที่สอดคล้องกันสร้างตัวตนของแบรนด์และทำให้งานของคุณจำได้
                </p>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-accent mb-3">
                  ความเข้าถึง
                </h3>
                <p className="text-sm text-foreground/70">
                  ความเคาน์เทสต์สีที่เหมาะสมทำให้เนื้อหาสามารถอ่านได้สำหรับทุกคน
                  รวมถึงผู้ที่มีความบ่วงตาสีบกพร่อง
                </p>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              พร้อมที่จะเรียนรู้เกี่ยวกับสีหรือยัง
            </h2>
            <p className="text-foreground/70 mb-6">
              เจาะลึกเครื่องมือแบบโต้ตอบของเราและสำรวจโลกสีของทฤษฎี
              เริ่มต้นด้วยวงจรสีและค้นพบว่าสีโต้ตอบกันอย่างไร
            </p>
            <div className="flex gap-4">
              <a
                href="/color-wheel"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                สำรวจวงจรสี
              </a>
              <a
                href="/color-patterns"
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                ดูแบบรูปสี
              </a>
            </div>
          </Card>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
