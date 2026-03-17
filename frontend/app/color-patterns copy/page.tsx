"use client";

import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ImageIcon,
  Upload,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
  Download,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SvgComponents } from "./svg";

interface Pattern {
  id: string;
  name: string;
  file_name: string;
  file_path: string;
  svg: string;
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

const palettePresets = [
  { name: "หมึกเข้ม", foreground: "#111827", background: "#F9FAFB" },
  { name: "น้ำทะเล", foreground: "#0C4A6E", background: "#E0F2FE" },
  { name: "ป่าไม้", foreground: "#14532D", background: "#ECFDF5" },
  { name: "อาทิตย์อัสดง", foreground: "#9A3412", background: "#FFF7ED" },
  { name: "ราชินี", foreground: "#312E81", background: "#EEF2FF" },
];

function hexToRgba(hex: string): RGBA {
  const normalized = hex.trim().replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
    a: 1,
  };
}

export default function PaletteVisualizerPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loadingPatterns, setLoadingPatterns] = useState(true);
  const [svg, setSvg] = useState<string | null>(null);
  const [selectedPatternId, setSelectedPatternId] = useState<string>("");

  const [foregroundHex, setForegroundHex] = useState("#111827");
  const [backgroundHex, setBackgroundHex] = useState("#F9FAFB");

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const foregroundRgba = useMemo(() => hexToRgba(foregroundHex), [foregroundHex]);
  const backgroundRgba = useMemo(() => hexToRgba(backgroundHex), [backgroundHex]);

  useEffect(() => {
    document.title = "ตัวปรับพาเลตต์ลายผ้า - Sipator";
    getPatterns();
  }, []);

  async function getPatterns() {
    setLoadingPatterns(true);
    try {
      const response = await axios.get("/api/pattern");
      setPatterns(response.data.patternsWithSVG ?? []);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการโหลดลวดลาย:", error);
    } finally {
      setLoadingPatterns(false);
    }
  }

  async function handleUploadSvg() {
    const input = fileInputRef.current;
    if (!input?.files?.length) return;

    const formData = new FormData();
    formData.append("file", input.files[0]);

    try {
      const response = await axios.post("/api/pattern", formData);
      setSvg(response.data.svg);
      setSelectedPatternId("");
      resetView();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปโหลด SVG:", error);
    } finally {
      input.value = "";
    }
  }

  function resetView() {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }

  function swapColors() {
    setForegroundHex(backgroundHex);
    setBackgroundHex(foregroundHex);
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setPosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp() {
    setIsDragging(false);
  }

  function handleExport() {
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 700;
    const tileSize = 60;

    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = backgroundHex;
    ctx.fillRect(0, 0, width, height);

    const coloredSvg = svg
      .replace(/fill=".*?"/g, `fill="${foregroundHex}"`)
      .replace(/stroke=".*?"/g, `stroke="${foregroundHex}"`);

    const image = new Image();
    image.onload = () => {
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          ctx.drawImage(image, x, y, tileSize, tileSize);
        }
      }

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "visualizer-pattern.png";
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    const svgBlob = new Blob([coloredSvg], {
      type: "image/svg+xml;charset=utf-8",
    });
    image.src = URL.createObjectURL(svgBlob);
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-28 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-sm text-foreground/80">
              <ImageIcon className="h-4 w-4" />
              ตัวปรับพาเลตต์ลายผ้า
            </span>
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
              ปรับสีไฟล์ SVG ได้ทันที
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 md:text-lg">
              อัปโหลดหรือเลือกลวดลายจากคลัง จากนั้นปรับสีหน้า-หลังและดูผลลัพธ์แบบเรียลไทม์
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <Card className="space-y-5 border-border/70 bg-card/80 p-5 backdrop-blur">
              <div>
                <Label className="mb-2 block text-sm font-semibold">แหล่งไฟล์ SVG</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/svg+xml"
                  onChange={handleUploadSvg}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full justify-start gap-2"
                >
                  <Upload className="h-4 w-4" />
                  อัปโหลดไฟล์ SVG
                </Button>
              </div>

              <div>
                <Label className="mb-2 block text-sm font-semibold">คลังลวดลาย</Label>
                <div className="max-h-64 overflow-y-auto pr-1">
                  {loadingPatterns && (
                    <div className="rounded-lg border border-border/70 p-4 text-sm text-foreground/60">
                      กำลังโหลดลวดลาย...
                    </div>
                  )}

                  {!loadingPatterns && (
                    <div className="grid grid-cols-4 gap-2">
                      {patterns.map((pattern) => (
                        <button
                          key={pattern.id}
                          onClick={() => {
                            setSvg(pattern.svg);
                            setSelectedPatternId(pattern.id);
                            resetView();
                          }}
                          title={pattern.file_name}
                          className={`group relative aspect-square w-full overflow-hidden rounded-md border p-1 transition ${
                            selectedPatternId === pattern.id
                              ? "border-primary/60 bg-primary/10"
                              : "border-border/70 bg-background hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div
                            className="flex h-full w-full items-center justify-center rounded-sm"
                            dangerouslySetInnerHTML={{
                              __html: pattern.svg.replace(
                                /(width|height)=".*?"/g,
                                'width="26" height="26"'
                              ),
                            }}
                          />
                          <div className="pointer-events-none absolute inset-x-1 bottom-1 translate-y-2 rounded bg-foreground/90 px-1 py-0.5 text-[10px] text-background opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                            <span className="block truncate">{pattern.file_name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="block text-sm font-semibold">เครื่องมือปรับพาเลตต์</Label>

                <div className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <input
                    type="color"
                    value={foregroundHex}
                    onChange={(e) => setForegroundHex(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-md border border-border bg-transparent p-0"
                  />
                  <Input
                    value={foregroundHex}
                    onChange={(e) => setForegroundHex(e.target.value)}
                    placeholder="#111827"
                  />
                </div>

                <div className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <input
                    type="color"
                    value={backgroundHex}
                    onChange={(e) => setBackgroundHex(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-md border border-border bg-transparent p-0"
                  />
                  <Input
                    value={backgroundHex}
                    onChange={(e) => setBackgroundHex(e.target.value)}
                    placeholder="#F9FAFB"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {palettePresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setForegroundHex(preset.foreground);
                        setBackgroundHex(preset.background);
                      }}
                      className="rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs text-foreground/75 transition hover:bg-muted"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={swapColors}
                  className="w-full gap-2"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                  สลับสีพื้นหน้าและพื้นหลัง
                </Button>
              </div>

              <Button onClick={handleExport} disabled={!svg} className="w-full gap-2">
                <Download className="h-4 w-4" />
                ส่งออกเป็น PNG
              </Button>
            </Card>

            <Card className="border-border/70 bg-card/80 p-5 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground/80">พรีวิวแบบสด</h2>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setScale((prev) => Math.min(prev + 0.1, 2))}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="secondary" size="icon" onClick={resetView}>
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div
                className="relative h-[600px] overflow-hidden rounded-xl border border-border/70 bg-[radial-gradient(circle,_#d0d4d9_1px,_#f9fafb_1px)] [background-size:20px_20px] p-10"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {!svg && (
                  <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border/70 bg-background/60 text-sm text-foreground/60">
                    อัปโหลดหรือเลือกลวดลาย SVG เพื่อเริ่มปรับพาเลตต์
                  </div>
                )}

                {svg && (
                  <div
                    className="mx-auto h-full w-full max-w-3xl rounded-2xl border border-border/60 bg-white p-6 shadow-sm"
                    style={{
                      transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                      transformOrigin: "center center",
                      transition: isDragging ? "none" : "transform 0.15s ease",
                    }}
                  >
                    <SvgComponents
                      svg={svg}
                      foregroundColor={foregroundRgba}
                      backgroundColor={backgroundRgba}
                    />
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
