"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface WovenColor {
  id: string;
  name: string;
}

export default function WovenColorsPage() {
  const [wovenColors, setWovenColors] = useState<WovenColor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const palettePreview = [
    "from-rose-400/80 via-orange-300/70 to-yellow-300/70",
    "from-cyan-400/80 via-sky-300/70 to-blue-300/70",
    "from-emerald-400/80 via-lime-300/70 to-teal-300/70",
    "from-fuchsia-400/80 via-pink-300/70 to-red-300/70",
    "from-indigo-400/80 via-violet-300/70 to-purple-300/70",
    "from-amber-400/80 via-orange-300/70 to-rose-300/70",
  ];

  useEffect(() => {
    document.title = "คลังสีผ้าทอ - Sipator";
    getWovenColors();
  }, []);

  const filteredWovenColors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return wovenColors;
    return wovenColors.filter((color) =>
      color.name.toLowerCase().includes(query)
    );
  }, [searchQuery, wovenColors]);

  async function getWovenColors() {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get("/api/woven-colors");
      setWovenColors(response.data.wovenColors);
    } catch (error) {
      console.error("There was an error fetching the woven colors!", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-20 top-24 -z-10 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-36 -z-10 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              สีผ้าทอ
            </Badge>
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
              คลังสีผ้าทอ
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              สำรวจชื่อสีผ้าทอพื้นถิ่นในรูปแบบที่ค้นหาและเรียกดูได้ง่าย
            </p>
          </div>

          <div className="mb-10 grid gap-4 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur md:grid-cols-[1fr_auto] md:items-center">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="ค้นหาชื่อสีผ้าทอ..."
                className="h-11 border-border/70 bg-background/80 pl-9"
              />
            </label>
            <div className="inline-flex items-center gap-2 justify-self-start rounded-xl bg-muted/50 px-3 py-2 text-sm text-foreground/70 md:justify-self-end">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>
                แสดง {filteredWovenColors.length} จาก {wovenColors.length} รายการ
              </span>
            </div>
          </div>
        </div>

        {isError && (
          <div className="mx-auto mb-8 max-w-7xl rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            ไม่สามารถโหลดข้อมูลสีผ้าทอได้ กรุณาลองใหม่อีกครั้ง
          </div>
        )}

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <Card
                key={`loading-${index}`}
                className="overflow-hidden border-border/70 bg-card/80 p-0"
              >
                <div className="h-24 animate-pulse bg-muted/70" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted/70" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted/70" />
                </div>
              </Card>
            ))}

          {!isLoading &&
            filteredWovenColors.map((color, index) => (
              <Link href={`/woven-colors/${color.id}`} key={color.id}>
                <Card className="group h-full overflow-hidden border-border/70 bg-card/90 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                  <div
                    className={`h-24 bg-gradient-to-r ${palettePreview[index % palettePreview.length]}`}
                  />
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {color.name}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/55">
                      ดูรายละเอียดและการนำไปใช้งาน
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
        </div>

        {!isLoading && !isError && filteredWovenColors.length === 0 && (
          <div className="mx-auto mt-10 max-w-lg rounded-xl border border-dashed border-border p-8 text-center text-foreground/70">
            ไม่พบข้อมูลสีผ้าทอสำหรับ "{searchQuery}"
          </div>
        )}
      </main>
    </div>
  );
}
