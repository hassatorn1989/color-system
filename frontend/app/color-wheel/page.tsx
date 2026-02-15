"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import ColorWheelHarmony from "@/components/ColorWheel";

interface GroupColor {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_active: boolean;
}

interface Color {
  id: string;
  group_color_id: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_active: boolean;
}

const harmonyOptions = [
  { key: "monochromatic", th: "สีเอกรงค์", en: "Monochromatic", hint: "โทนสีเดียวกัน" },
  { key: "complementary", th: "สีคู่ตรงข้าม", en: "Complementary", hint: "ความต่างสูง" },
  { key: "analogous", th: "สีข้างเคียง", en: "Analogous", hint: "ไหลลื่นกลมกลืน" },
  { key: "triadic", th: "สีสามเส้า", en: "Triadic", hint: "สมดุลพร้อมจุดสนใจ" },
  { key: "split-complementary", th: "สีตรงข้ามเยื้อง", en: "Split Complementary", hint: "ปลอดภัยและมีมิติ" },
  { key: "tetradic", th: "สีสี่เหลี่ยมผืนผ้า", en: "Tetradic", hint: "เหมาะงานที่ต้องการสีหลายกลุ่ม" },
  { key: "square", th: "สีสี่เหลี่ยมจัตุรัส", en: "Square", hint: "สมดุลทุกด้าน" },
];

export default function ColorWheelPage() {
  const [groupColor, setGroupColor] = React.useState<GroupColor[]>([]);
  const [harmonyType, setHarmonyType] = React.useState<string>("monochromatic");
  const [baseColor, setBaseColor] = React.useState<string[]>([]);
  const [groupColorId, setGroupColorId] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSendData = (data: Array<number>) => {
    data.forEach((hue, index) => {
      const colorIndex = Math.floor(hue / 30) % 12;
      console.log("Index:", index, "Color:", baseColor[colorIndex]);
    });
  };

  useEffect(() => {
    document.title = "วงล้อสี - Sipator";
    setLoading(true);
    getGroupColor();
  }, []);

  function getGroupColor() {
    axios
      .get("/api/group-color")
      .then((response) => {
        setGroupColor(response.data.groupColor);
        if (response.data.groupColor.length > 0) {
          selectColor(response.data.groupColor[0].id);
        } else {
          selectColor("");
        }
      })
      .catch((error) => {
        console.error("Error fetching color data:", error);
      });
  }

  function selectColor(nextGroupColorId: string) {
    setLoading(true);
    if (nextGroupColorId === "") {
      setBaseColor([
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#7FFF00",
        "#00FF00",
        "#00FF7F",
        "#00FFFF",
        "#007FFF",
        "#0000FF",
        "#7F00FF",
        "#FF00FF",
        "#FF007F",
      ]);
      setGroupColorId("");
      setLoading(false);
    } else {
      axios
        .get(`/api/color/?groupColorId=${nextGroupColorId}`)
        .then((response) => {
          setBaseColor(response.data.colors.map((color: Color) => color.color));
          setGroupColorId(nextGroupColorId);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching selected color data:", error);
          setLoading(false);
        });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="relative overflow-hidden px-4 pb-20 pt-32">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-28 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 px-4 py-2 text-sm">
              เครื่องมือทฤษฎีสี
            </Badge>
            <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-4xl font-black leading-tight text-transparent md:text-6xl">
              วงล้อสีสมัยใหม่
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
              วิเคราะห์ความสัมพันธ์ของสีและทดสอบชุดสีที่เหมาะกับงานออกแบบได้อย่างรวดเร็ว
            </p>
          </div>

          <section className="mb-8 rounded-2xl border border-border/70 bg-card/75 p-5 shadow-sm backdrop-blur">
            <div className="mb-4 flex items-center gap-2 text-sm text-foreground/70">
              <Sparkles className="h-4 w-4 text-accent" />
              <div className="leading-tight">
                <span className="block text-sm font-medium text-foreground/80">
                  เลือกรูปแบบความกลมกลืนของสี
                </span>
                <span className="block text-[11px] text-foreground/60">
                  Choose a harmony model
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
              {harmonyOptions.map((type) => (
                <button
                  key={type.key}
                  className={`rounded-xl border px-3 py-3 text-left transition-all duration-300 ${
                    harmonyType === type.key
                      ? "border-primary/60 bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border-border/70 bg-background/70 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-background"
                  }`}
                  onClick={() => setHarmonyType(type.key)}
                >
                  <p className="text-sm font-semibold leading-tight">{type.th}</p>
                  <p
                    className={`text-[11px] leading-tight ${
                      harmonyType === type.key
                        ? "text-primary-foreground/85"
                        : "text-foreground/60"
                    }`}
                  >
                    {type.en}
                  </p>
                  <p
                    className={`mt-1 text-xs ${
                      harmonyType === type.key
                        ? "text-primary-foreground/85"
                        : "text-foreground/60"
                    }`}
                  >
                    {type.hint}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {loading ? (
            <div className="flex min-h-[28rem] items-center justify-center rounded-2xl border border-border/70 bg-card/60">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            </div>
          ) : (
            baseColor.length > 0 && (
              <ColorWheelHarmony
                baseColor={baseColor}
                onSendData={handleSendData}
                harmonyType={harmonyType}
                groupColor={groupColor}
                groupColorId={groupColorId}
                selectColor={selectColor}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
