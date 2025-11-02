"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-40 pb-20 px-4 overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary floating glow orbs */}
        <div
          className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-glow"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 -left-40 w-96 h-96 bg-gradient-to-tr from-secondary/15 to-secondary/5 rounded-full blur-3xl animate-glow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-float-wave"
          style={{ animationDelay: "1s" }}
        />

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary/30 rounded-full animate-fade-dot" style={{ animationDelay: "0.6s" }} />
          <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-accent/30 rounded-full animate-fade-dot" style={{ animationDelay: "0.9s" }} />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-secondary/30 rounded-full animate-fade-dot" style={{ animationDelay: "1.2s" }} />
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <Badge
          variant="outline"
          className="mb-6 px-4 py-2 text-base animate-float-up"
          style={{ animationDelay: "0.1s" }}
        >
          เรียนรู้ทฤษฎีสี
        </Badge>

        <h1
          className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance animate-float-up"
          style={{ animationDelay: "0.2s" }}
        >
          การเชี่ยวชาญในศิลปะของ
          <br />
          <span
            className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-float-up"
            style={{ animationDelay: "0.3s" }}
          >
            ทฤษฎีสี
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed text-balance animate-float-up"
          style={{ animationDelay: "0.4s" }}
        >
          สำรวจวิทยาศาสตร์และความงามของสี เรียนรู้เกี่ยวกับความสามัคคี จิตวิทยา และสร้างแพลตฟอร์มที่น่าทึ่ง
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-float-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 transform hover:scale-105"
          >
            เริ่มเรียนรู้
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 transform hover:scale-105"
          >
            ดูคู่มือ
          </Button>
        </div>
      </div>

      {/* Local animation styles (prefers-reduced-motion friendly) */}
      <style jsx>{`
        /* Core entrance animation used by many elements. animationDelay is set inline above. */
        .animate-float-up {
          opacity: 0;
          transform: translateY(14px) scale(0.995);
          animation-name: floatUp;
          animation-duration: 700ms;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: both;
        }

        /* Small pulsing glow for the large orbs */
        .animate-glow {
          transform-origin: center;
          opacity: 0.9;
          animation-name: glowPulse;
          animation-duration: 6s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
        }

        /* Gentle vertical float/wave for decorative orb */
        .animate-float-wave {
          animation-name: floatWave;
          animation-duration: 5s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
        }

        /* Tiny dot fade/scale for background pattern */
        .animate-fade-dot {
          opacity: 0;
          transform: scale(0.6);
          animation-name: fadeDot;
          animation-duration: 900ms;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.995);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes glowPulse {
          0% {
            transform: scale(0.98);
            filter: blur(28px);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.03);
            filter: blur(36px);
            opacity: 1;
          }
          100% {
            transform: scale(0.98);
            filter: blur(28px);
            opacity: 0.85;
          }
        }

        @keyframes floatWave {
          0% {
            transform: translateY(0) translateX(0) scale(1);
          }
          50% {
            transform: translateY(-12px) translateX(6px) scale(1.02);
          }
          100% {
            transform: translateY(0) translateX(0) scale(1);
          }
        }

        @keyframes fadeDot {
          from {
            opacity: 0;
            transform: scale(0.6);
          }
          to {
            opacity: 0.45;
            transform: scale(1);
          }
        }

        /* Respect user preference for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-up,
          .animate-glow,
          .animate-float-wave,
          .animate-fade-dot {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}
