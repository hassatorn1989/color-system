"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, Copy, Layers, Palette } from "lucide-react";

interface FabricColor {
  id: string;
  name: string;
  hex_code: string;
}

interface SubFabricColor {
  id: string;
  name: string;
  fabricColors: FabricColor[];
}

interface GroupFabricColor {
  id: string;
  name: string;
}

function hexToHsl(hex: string) {
  const normalized = hex.trim().replace("#", "");
  const valid = /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(normalized);
  if (!valid) return "HEX ไม่ถูกต้อง";

  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;

  const r = parseInt(fullHex.slice(0, 2), 16) / 255;
  const g = parseInt(fullHex.slice(2, 4), 16) / 255;
  const b = parseInt(fullHex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);
  if (h < 0) h += 360;

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

export default function WovenColorDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";

  const [group, setGroup] = useState<GroupFabricColor | null>(null);
  const [subFabricColors, setSubFabricColors] = useState<SubFabricColor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const totalColors = useMemo(
    () =>
      subFabricColors.reduce(
        (total, subGroup) => total + subGroup.fabricColors.length,
        0
      ),
    [subFabricColors]
  );

  useEffect(() => {
    if (!id) return;
    getWovenColorDetail(id);
  }, [id]);

  async function getWovenColorDetail(groupId: string) {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get(`/api/woven-colors/${groupId}`);
      setGroup(response.data.group);
      setSubFabricColors(response.data.subFabricColors ?? []);
      document.title = `${response.data.group?.name ?? "สีผ้าทอ"} - Sipator`;
    } catch (error) {
      console.error("Unable to load woven color detail:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function copyToClipboard(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <Link
            href="/woven-colors"
            className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/60 px-3 py-2 text-sm text-foreground/75 transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            กลับไปหน้าคลังสีผ้าทอ
          </Link>

          {isLoading && (
            <div className="mt-8 space-y-4">
              <div className="h-10 w-72 animate-pulse rounded bg-muted/70" />
              <div className="h-5 w-52 animate-pulse rounded bg-muted/70" />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-60 animate-pulse rounded-2xl border border-border/70 bg-card"
                  />
                ))}
              </div>
            </div>
          )}

          {!isLoading && isError && (
            <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              ไม่สามารถโหลดรายละเอียดสีผ้าทอได้
            </div>
          )}

          {!isLoading && !isError && group && (
            <div className="mt-8">
              <section className="rounded-2xl border border-border/70 bg-card/70 p-6 shadow-sm backdrop-blur">
                <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                  {group.name}
                </h1>
                <p className="mt-2 text-foreground/70">
                  รายละเอียดสีผ้าทอในกลุ่มนี้ พร้อมคัดลอกค่าสีไปใช้งานได้ทันที
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-sm text-foreground/75">
                    <Layers className="h-4 w-4 text-primary" />
                    <span>{subFabricColors.length} หมวดย่อย</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-sm text-foreground/75">
                    <Palette className="h-4 w-4 text-accent" />
                    <span>สีผ้าทอทั้งหมด {totalColors} รายการ</span>
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {subFabricColors.map((subGroup) => (
                  <article
                    key={subGroup.id}
                    className="rounded-2xl border border-border/70 bg-card/85 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="mb-3 border-b border-border/60 pb-3">
                      <h2 className="text-lg font-semibold">{subGroup.name}</h2>
                      <p className="mt-1 text-xs text-foreground/55">
                        จำนวนสีในหมวดนี้ {subGroup.fabricColors.length} สี
                      </p>
                    </div>

                    <div className="space-y-3">
                      {subGroup.fabricColors.length === 0 && (
                        <div className="rounded-lg border border-dashed border-border p-3 text-sm text-foreground/60">
                          ยังไม่มีรายการสีในหมวดย่อยนี้
                        </div>
                      )}

                      {subGroup.fabricColors.map((color) => {
                        const hslValue = hexToHsl(color.hex_code);
                        return (
                          <div
                            key={color.id}
                            className="rounded-xl border border-border/60 bg-background/70 p-3"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="h-11 w-11 shrink-0 rounded-md border border-border/60 shadow-inner"
                                style={{ backgroundColor: color.hex_code }}
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                  {color.name}
                                </p>
                                <p className="mt-1 text-xs text-foreground/65">
                                  HEX: {color.hex_code}
                                </p>
                                <p className="text-xs text-foreground/65">
                                  HSL: {hslValue}
                                </p>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                onClick={() =>
                                  copyToClipboard(color.hex_code, `${color.id}-hex`)
                                }
                                className="inline-flex items-center gap-1 rounded-md border border-border/70 px-2 py-1 text-[11px] text-foreground/75 transition hover:bg-muted"
                              >
                                {copiedKey === `${color.id}-hex` ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                                {copiedKey === `${color.id}-hex`
                                  ? "คัดลอก HEX แล้ว"
                                  : "คัดลอก HEX"}
                              </button>
                              <button
                                onClick={() =>
                                  copyToClipboard(hslValue, `${color.id}-hsl`)
                                }
                                className="inline-flex items-center gap-1 rounded-md border border-border/70 px-2 py-1 text-[11px] text-foreground/75 transition hover:bg-muted"
                              >
                                {copiedKey === `${color.id}-hsl` ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                                {copiedKey === `${color.id}-hsl`
                                  ? "คัดลอก HSL แล้ว"
                                  : "คัดลอก HSL"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
