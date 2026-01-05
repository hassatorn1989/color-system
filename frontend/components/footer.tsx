"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    /* Updated footer text to Thai */
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Sipator</h3>
            <p className="opacity-80 leading-relaxed">คำแนะนำของคุณในการเรียนรู้ทฤษฎีสีและการสร้างแพลตฟอร์มสีที่สวยงาม</p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">ทรัพยากร</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="#wheel" className="hover:opacity-100 transition hover:underline">
                  วงจรสี
                </Link>
              </li>
              <li>
                <Link href="#harmony" className="hover:opacity-100 transition hover:underline">
                  ความสามัคคี
                </Link>
              </li>
              <li>
                <Link href="#psychology" className="hover:opacity-100 transition hover:underline">
                  จิตวิทยา
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">ติดต่อสัมพันธ์</h4>
            <ul className="space-y-2 opacity-80">
              <li>
                <Link href="#" className="hover:opacity-100 transition hover:underline">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition hover:underline">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-100 transition hover:underline">
                  อีเมล
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center opacity-80">
          <p>&copy; {currentYear} Sipator. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  )
}
