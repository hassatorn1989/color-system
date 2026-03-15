"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  Eraser,
  Grid3X3,
  Minus,
  PaintBucket,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_COLORS = [
  "#000000",
  "#ffffff",
  "#7C2D12",
  "#B45309",
  "#D97706",
  "#A16207",
  "#365314",
  "#0F766E",
  "#1D4ED8",
  "#4338CA",
  "#7C3AED",
  "#BE185D",
  "#9CA3AF",
  "#6B7280",
  "#374151",
  "transparent",
] as const;

const PALETTE_PRESETS = [
  { name: "ไหมคราม", primary: "#1D4ED8", accent: "#E0E7FF" },
  { name: "ดินเผา", primary: "#C2410C", accent: "#FFEDD5" },
  { name: "ป่าเขา", primary: "#3F6212", accent: "#ECFCCB" },
  { name: "กลีบบัว", primary: "#BE185D", accent: "#FCE7F3" },
] as const;

const MIN_BOARD_SIZE = 4;
const MAX_BOARD_SIZE = 64;
const MIN_PIXEL_SIZE = 10;
const MAX_PIXEL_SIZE = 36;
const TRANSPARENT_PATTERN =
  "linear-gradient(45deg, rgba(148,163,184,0.28) 25%, transparent 25%, transparent 75%, rgba(148,163,184,0.28) 75%, rgba(148,163,184,0.28)), linear-gradient(45deg, rgba(148,163,184,0.28) 25%, transparent 25%, transparent 75%, rgba(148,163,184,0.28) 75%, rgba(148,163,184,0.28))";

type Tool = "pencil" | "eraser" | "fill";
type PixelCell = string;
type PixelGrid = PixelCell[][];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function makeGrid(rows: number, cols: number): PixelGrid {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => "transparent")
  );
}

function sanitizeColor(value: unknown): PixelCell {
  if (value === "transparent") return value;
  if (typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value)) {
    return value;
  }
  return "transparent";
}

function normalizeGrid(data: unknown, rows: number, cols: number): PixelGrid {
  const next = makeGrid(rows, cols);
  if (!Array.isArray(data)) return next;

  for (let r = 0; r < Math.min(data.length, rows); r += 1) {
    const row = data[r];
    if (!Array.isArray(row)) continue;

    for (let c = 0; c < Math.min(row.length, cols); c += 1) {
      next[r][c] = sanitizeColor(row[c]);
    }
  }

  return next;
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function floodFill(
  grid: PixelGrid,
  startRow: number,
  startCol: number,
  targetColor: PixelCell,
  replacementColor: PixelCell
) {
  if (targetColor === replacementColor) return grid;

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const next = grid.map((row) => [...row]);
  const stack: Array<[number, number]> = [[startRow, startCol]];

  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;

    const [row, col] = current;
    if (row < 0 || col < 0 || row >= rows || col >= cols) continue;
    if (next[row][col] !== targetColor) continue;

    next[row][col] = replacementColor;
    stack.push([row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]);
  }

  return next;
}

export default function PixelArtPage() {
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const [rows, setRows] = useState(36);
  const [cols, setCols] = useState(36);
  const [pixelSize, setPixelSize] = useState(22);
  const [projectName, setProjectName] = useState("pixel-art");
  const [selectedColor, setSelectedColor] = useState<PixelCell>("#000000");
  const [tool, setTool] = useState<Tool>("pencil");
  const [showGrid, setShowGrid] = useState(true);
  const [grid, setGrid] = useState<PixelGrid>(() => makeGrid(36, 36));
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    document.title = "วาดลายพิกเซล - Sipator";
  }, []);

  useEffect(() => {
    const stopDrawing = () => setIsDrawing(false);
    window.addEventListener("mouseup", stopDrawing);
    window.addEventListener("blur", stopDrawing);

    return () => {
      window.removeEventListener("mouseup", stopDrawing);
      window.removeEventListener("blur", stopDrawing);
    };
  }, []);

  const boardStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${pixelSize}px)`,
    }),
    [cols, pixelSize, rows]
  );

  const filledPixels = useMemo(
    () => grid.flat().filter((cell) => cell !== "transparent").length,
    [grid]
  );

  const paintCell = (row: number, col: number) => {
    setGrid((previous) => {
      if (tool === "fill") {
        return floodFill(previous, row, col, previous[row][col], selectedColor);
      }

      const next = previous.map((gridRow) => [...gridRow]);
      next[row][col] = tool === "eraser" ? "transparent" : selectedColor;
      return next;
    });
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    paintCell(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!isDrawing || tool === "fill") return;
    paintCell(row, col);
  };

  const resetBoard = () => {
    setGrid(makeGrid(rows, cols));
  };

  const resizeBoard = (nextRows: number, nextCols: number) => {
    const safeRows = clamp(nextRows, MIN_BOARD_SIZE, MAX_BOARD_SIZE);
    const safeCols = clamp(nextCols, MIN_BOARD_SIZE, MAX_BOARD_SIZE);

    setRows(safeRows);
    setCols(safeCols);
    setGrid((previous) => {
      const next = makeGrid(safeRows, safeCols);

      for (let row = 0; row < Math.min(previous.length, safeRows); row += 1) {
        for (let col = 0; col < Math.min(previous[0]?.length ?? 0, safeCols); col += 1) {
          next[row][col] = previous[row][col];
        }
      }

      return next;
    });
  };

  const exportProject = () => {
    const payload = {
      rows,
      cols,
      pixelSize,
      projectName,
      grid,
    };

    downloadTextFile(
      `${projectName || "pixel-art"}.json`,
      JSON.stringify(payload, null, 2)
    );
  };

  const importProject = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const input = event.currentTarget;

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      try {
        const data = JSON.parse(String(readerEvent.target?.result || "{}")) as {
          rows?: number;
          cols?: number;
          pixelSize?: number;
          projectName?: string;
          grid?: unknown;
        };

        const safeRows = clamp(data.rows ?? 20, MIN_BOARD_SIZE, MAX_BOARD_SIZE);
        const safeCols = clamp(data.cols ?? 20, MIN_BOARD_SIZE, MAX_BOARD_SIZE);
        const safePixelSize = clamp(
          data.pixelSize ?? 22,
          MIN_PIXEL_SIZE,
          MAX_PIXEL_SIZE
        );

        setRows(safeRows);
        setCols(safeCols);
        setPixelSize(safePixelSize);
        setProjectName(data.projectName || "pixel-art");
        setGrid(normalizeGrid(data.grid, safeRows, safeCols));
      } catch {
        window.alert("ไฟล์ JSON ไม่ถูกต้อง");
      } finally {
        input.value = "";
      }
    };

    reader.readAsText(file);
  };

  const exportPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = cols * pixelSize;
    canvas.height = rows * pixelSize;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const color = grid[row][col];
        if (!color || color === "transparent") continue;

        context.fillStyle = color;
        context.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
      }
    }

    const link = document.createElement("a");
    link.download = `${projectName || "pixel-art"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-28 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <section className="mx-auto mb-10 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Pixel Pattern Studio
            </Badge>
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
              วาดลวดลายพิกเซลให้เข้ากับงานผ้าได้ในหน้าเดียว
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/70 md:text-lg">
              ทดลองวางจังหวะลาย เติมสี ย่อขยายบอร์ด และส่งออกเป็น PNG หรือ JSON
              เพื่อใช้ต่อในงานออกแบบลวดลายได้ทันที
            </p>
          </section>

          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/75 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">โปรเจกต์ปัจจุบัน</p>
              <p className="text-sm text-foreground/65">
                {projectName || "pixel-art"} • {cols} x {rows} ช่อง • ลงสีแล้ว {filledPixels} จุด
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2" onClick={resetBoard}>
                <RotateCcw className="h-4 w-4" />
                รีเซ็ต
              </Button>
              <Button variant="outline" className="gap-2" onClick={exportProject}>
                <Download className="h-4 w-4" />
                บันทึก JSON
              </Button>
              <Button className="gap-2" onClick={exportPNG}>
                <Download className="h-4 w-4" />
                ส่งออก PNG
              </Button>
            </div>
          </div>

          <section className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
            <Card className="border-border/70 bg-card/80 shadow-sm backdrop-blur">
              <CardHeader className="gap-2">
                <CardTitle>ตั้งค่าพื้นฐาน</CardTitle>
                <CardDescription>
                  เลือกเครื่องมือ จัดการสี และกำหนดขนาดบอร์ดสำหรับลวดลายพิกเซล
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">ชื่อโปรเจกต์</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(event) => setProjectName(event.target.value)}
                    placeholder="pixel-art"
                    className="bg-background/80"
                  />
                </div>

                <div className="space-y-3">
                  <Label>เครื่องมือ</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={tool === "pencil" ? "default" : "outline"}
                      className="h-11"
                      onClick={() => setTool("pencil")}
                    >
                      <Pencil className="h-4 w-4" />
                      ดินสอ
                    </Button>
                    <Button
                      variant={tool === "eraser" ? "default" : "outline"}
                      className="h-11"
                      onClick={() => setTool("eraser")}
                    >
                      <Eraser className="h-4 w-4" />
                      ลบ
                    </Button>
                    <Button
                      variant={tool === "fill" ? "default" : "outline"}
                      className="h-11"
                      onClick={() => setTool("fill")}
                    >
                      <PaintBucket className="h-4 w-4" />
                      เทสี
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>ชุดสีเริ่มต้น</Label>
                  <div className="flex flex-wrap gap-2">
                    {PALETTE_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setSelectedColor(preset.primary)}
                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-foreground/75 transition hover:bg-muted"
                      >
                        <span
                          className="h-3 w-3 rounded-full border border-border/60"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span
                          className="h-3 w-3 rounded-full border border-border/60"
                          style={{ backgroundColor: preset.accent }}
                        />
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>สีสำหรับวาด</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {DEFAULT_COLORS.map((color) => {
                      const isTransparent = color === "transparent";
                      const isActive = selectedColor === color;

                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          title={color}
                          className={`h-12 rounded-xl border-2 transition ${
                            isActive
                              ? "border-primary shadow-sm shadow-primary/20"
                              : "border-border/80 hover:border-primary/40"
                          }`}
                          style={{
                            backgroundColor: isTransparent ? "transparent" : color,
                            backgroundImage: isTransparent ? TRANSPARENT_PATTERN : "none",
                            backgroundSize: isTransparent ? "12px 12px" : undefined,
                            backgroundPosition: isTransparent ? "0 0, 6px 6px" : undefined,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium">Columns</span>
                      <span className="text-sm text-foreground/65">{cols}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => resizeBoard(rows, cols - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => resizeBoard(rows, cols + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/70 bg-background/60 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium">Rows</span>
                      <span className="text-sm text-foreground/65">{rows}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => resizeBoard(rows - 1, cols)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => resizeBoard(rows + 1, cols)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-border/70 bg-background/60 p-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pixel-size">ขนาดพิกเซล</Label>
                    <span className="text-sm text-foreground/65">{pixelSize}px</span>
                  </div>
                  <input
                    id="pixel-size"
                    type="range"
                    min={MIN_PIXEL_SIZE}
                    max={MAX_PIXEL_SIZE}
                    value={pixelSize}
                    onChange={(event) => setPixelSize(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => setShowGrid((current) => !current)}
                  >
                    <Grid3X3 className="h-4 w-4" />
                    {showGrid ? "ซ่อนกริด" : "แสดงกริด"}
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={resetBoard}>
                    <Trash2 className="h-4 w-4" />
                    ล้างทั้งหมด
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => jsonInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    โหลด JSON
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={exportProject}>
                    <Download className="h-4 w-4" />
                    เซฟ JSON
                  </Button>
                  <input
                    ref={jsonInputRef}
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={importProject}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/80 shadow-sm backdrop-blur">
              <CardHeader className="gap-2">
                <CardTitle>พื้นที่วาดลาย</CardTitle>
                <CardDescription>
                  คลิกเพื่อวาด กดค้างแล้วลากต่อเนื่องได้ทันที หรือใช้ถังเทสีเพื่อเติมพื้นที่
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-auto pb-6">
                <div className="rounded-[28px] border border-border/70 bg-gradient-to-br from-muted/70 via-background to-secondary/10 p-3 md:p-4">
                  <div className="overflow-auto rounded-2xl border border-border/70 bg-white p-3 md:p-5">
                    <div className="min-w-max">
                      <div
                        className="grid rounded-xl bg-white p-2"
                        style={boardStyle}
                        onMouseLeave={() => setIsDrawing(false)}
                      >
                        {grid.map((row, rowIndex) =>
                          row.map((color, colIndex) => (
                            <button
                              key={`${rowIndex}-${colIndex}`}
                              type="button"
                              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                              aria-label={`cell-${rowIndex}-${colIndex}`}
                              className={`transition ${
                                showGrid ? "border border-border/60" : "border border-transparent"
                              }`}
                              style={{
                                width: pixelSize,
                                height: pixelSize,
                                backgroundColor: color === "transparent" ? "#ffffff" : color,
                                backgroundImage: "none",
                              }}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </section>
        </div>
      </main>
    </div>
  );
}
