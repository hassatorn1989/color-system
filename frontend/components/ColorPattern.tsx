"use client";
import React, { useMemo, useState } from "react";
import { Copy } from "lucide-react";
interface ColorPatternProps {
  harmonyColors: number[];
  baseColor: string[];
  harmonyType: string;
}

export const ColorPattern: React.FC<ColorPatternProps> = ({
  harmonyColors,
  baseColor,
  harmonyType,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (
    colors: string[],
    index: number,
    type: "background" | "foreground",
  ) => {
    try {
      const colorString =
        type === "background" ? `${colors.join(", ")}` : `${colors.join(", ")}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(colorString);
      } else {
        // Fallback for unsupported browsers
        const textarea = document.createElement("textarea");
        textarea.value = colorString;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      localStorage.setItem(
        type === "background"
          ? "copiedBackgroundColors"
          : "copiedForegroundColors",
        colorString,
      );
    } catch (err) {
      console.error("Failed to copy colors: ", err);
    }
  };

  // สร้าง color patterns ตามจำนวนสีใน harmony type (ใช้ useMemo เพื่อ performance)
  const colorPatterns = useMemo(() => {
    const patterns = [];
    const percentagePatterns = [];
    // ตรวจสอบว่าเป็น monochromatic (สีเดียว) หรือไม่
    if (harmonyType === "monochromatic" && harmonyColors.length === 1) {
      const baseHue = harmonyColors[0];
      const colorIndex = Math.floor(baseHue / 30) % 12;
      const baseColorValue = baseColor[colorIndex];

      // แปลง hex เป็น HSL เพื่อสร้างโทนสี
      const hexToHsl = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
          s = 0,
          l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }
        return [h * 360, s * 100, l * 100];
      };

      const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n: number) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      };

      // แปลงสีเป็น HSL
      const [hue, saturation, lightness] = hexToHsl(baseColorValue);

      // สร้าง 4 โทนสีแบบ Tailwind (เข้มไปอ่อน)
      const monochromaticShades = [
        hslToHex(hue, saturation, Math.max(lightness - 30, 10)), // เข้มที่สุด
        hslToHex(hue, saturation, Math.max(lightness - 15, 20)), // เข้มปานกลาง
        hslToHex(hue, saturation, lightness), // สีต้นฉบับ
        hslToHex(hue, saturation, Math.min(lightness + 20, 90)), // อ่อนที่สุด
      ];

      // สร้าง pattern หลายแบบสำหรับ monochromatic
      patterns.push(monochromaticShades); // pattern หลัก (เข้มไปอ่อน)
      patterns.push([...monochromaticShades].reverse()); // อ่อนไปเข้ม

      // สร้าง patterns เพิ่มเติมด้วยการปรับ saturation
      for (let i = 0; i < 6; i++) {
        const adjustedSaturation = Math.max(
          10,
          Math.min(100, saturation + (i - 3) * 15),
        );
        const adjustedShades = [
          hslToHex(hue, adjustedSaturation, Math.max(lightness - 30, 10)),
          hslToHex(hue, adjustedSaturation, Math.max(lightness - 15, 20)),
          hslToHex(hue, adjustedSaturation, lightness),
          hslToHex(hue, adjustedSaturation, Math.min(lightness + 20, 90)),
        ];
        patterns.push(adjustedShades);
      }

      // สร้าง patterns เพิ่มเติมด้วยการปรับ lightness
      for (let i = 0; i < 12; i++) {
        const baseLightness = 20 + i * 6;
        const adjustedShades = [
          hslToHex(hue, saturation, baseLightness),
          hslToHex(hue, saturation, Math.min(baseLightness + 15, 90)),
          hslToHex(hue, saturation, Math.min(baseLightness + 30, 95)),
          hslToHex(hue, saturation, Math.min(baseLightness + 45, 98)),
        ];
        patterns.push(adjustedShades);
      }

      percentagePatterns.push(
        [40, 30, 20, 10],
        [30, 30, 20, 20],
        [25, 25, 25, 25],
        [10, 20, 30, 40],
      );
    } else {
      // สร้าง pattern หลักจาก harmony colors (สำหรับ harmony types อื่นๆ)
      const mainPattern = harmonyColors.map((hue) => {
        const colorIndex = Math.floor(hue / 30) % 12;
        return baseColor[colorIndex];
      });

      if (mainPattern.length == 2) {
        patterns.push(mainPattern); // A B
        patterns.push([mainPattern[1], mainPattern[0]]); // B A
        percentagePatterns.push([70, 30], [60, 40], [50, 50], [40, 60]);
      } else if (mainPattern.length == 3) {
        patterns.push(mainPattern); // A B C
        patterns.push([mainPattern[0], mainPattern[2], mainPattern[1]]); // A C B
        patterns.push([mainPattern[1], mainPattern[0], mainPattern[2]]); // B A C
        patterns.push([mainPattern[1], mainPattern[2], mainPattern[0]]); // B C A
        patterns.push([mainPattern[2], mainPattern[0], mainPattern[1]]); // C A B
        patterns.push([mainPattern[2], mainPattern[1], mainPattern[0]]); // C B A
        percentagePatterns.push([50, 30, 20], [40, 40, 20], [33, 33, 34], [20, 30, 50]);
      } else if (mainPattern.length == 4) {
        patterns.push(mainPattern); // A B C D
        patterns.push([
          mainPattern[0],
          mainPattern[1],
          mainPattern[3],
          mainPattern[2],
        ]); // A B D C
        patterns.push([
          mainPattern[0],
          mainPattern[2],
          mainPattern[1],
          mainPattern[3],
        ]); // A C B D
        patterns.push([
          mainPattern[0],
          mainPattern[2],
          mainPattern[3],
          mainPattern[1],
        ]); // A C D B
        patterns.push([
          mainPattern[0],
          mainPattern[3],
          mainPattern[1],
          mainPattern[2],
        ]); // A D B C
        patterns.push([
          mainPattern[0],
          mainPattern[3],
          mainPattern[2],
          mainPattern[1],
        ]); // A D C B
        patterns.push([
          mainPattern[1],
          mainPattern[0],
          mainPattern[2],
          mainPattern[3],
        ]); // B A C D
        patterns.push([
          mainPattern[1],
          mainPattern[0],
          mainPattern[3],
          mainPattern[2],
        ]); // B A D C
        patterns.push([
          mainPattern[1],
          mainPattern[2],
          mainPattern[0],
          mainPattern[3],
        ]); // B C A D
        patterns.push([
          mainPattern[1],
          mainPattern[2],
          mainPattern[3],
          mainPattern[0],
        ]); // B C D A
        patterns.push([
          mainPattern[1],
          mainPattern[3],
          mainPattern[0],
          mainPattern[2],
        ]); // B D A C
        patterns.push([
          mainPattern[1],
          mainPattern[3],
          mainPattern[2],
          mainPattern[0],
        ]); // B D C A
        patterns.push([
          mainPattern[2],
          mainPattern[0],
          mainPattern[1],
          mainPattern[3],
        ]); // C A B D
        patterns.push([
          mainPattern[2],
          mainPattern[0],
          mainPattern[3],
          mainPattern[1],
        ]); // C A D B
        patterns.push([
          mainPattern[2],
          mainPattern[1],
          mainPattern[0],
          mainPattern[3],
        ]); // C B A D
        patterns.push([
          mainPattern[2],
          mainPattern[1],
          mainPattern[3],
          mainPattern[0],
        ]); // C B D A
        patterns.push([
          mainPattern[2],
          mainPattern[3],
          mainPattern[0],
          mainPattern[1],
        ]); // C D A B
        patterns.push([
          mainPattern[2],
          mainPattern[3],
          mainPattern[1],
          mainPattern[0],
        ]); // C D B A
        patterns.push([
          mainPattern[3],
          mainPattern[0],
          mainPattern[1],
          mainPattern[2],
        ]); // D A B C
        patterns.push([
          mainPattern[3],
          mainPattern[0],
          mainPattern[2],
          mainPattern[1],
        ]); // D A C B
        patterns.push([
          mainPattern[3],
          mainPattern[1],
          mainPattern[0],
          mainPattern[2],
        ]); // D B A C
        patterns.push([
          mainPattern[3],
          mainPattern[1],
          mainPattern[2],
          mainPattern[0],
        ]); // D B C A
        patterns.push([
          mainPattern[3],
          mainPattern[2],
          mainPattern[0],
          mainPattern[1],
        ]); // D C A B
        patterns.push([
          mainPattern[3],
          mainPattern[2],
          mainPattern[1],
          mainPattern[0],
        ]); // D C B A
        percentagePatterns.push(
          [40, 30, 20, 10],
          [30, 30, 20, 20],
          [25, 25, 25, 25],
          [10, 20, 30, 40],
        );
      }

      // return uniquePatterns.slice(0, 20);
    }

    // return patterns.slice(0, 20);
    return { patterns, percentagePatterns };

    // return uniquePatterns.slice(0, 20);
  }, [harmonyColors, baseColor, harmonyType]);

  const mixColors = (colors: string[]): string => {
    if (colors.length === 0) return "#000000";
    let r = 0,
      g = 0,
      b = 0;
    colors.forEach((hex) => {
      const color = hex.replace("#", "");
      r += parseInt(color.substring(0, 2), 16);
      g += parseInt(color.substring(2, 4), 16);
      b += parseInt(color.substring(4, 6), 16);
    });
    r = Math.round(r / colors.length);
    g = Math.round(g / colors.length);
    b = Math.round(b / colors.length);

    const colorName = hexToColorName(
      "#" +
        r.toString(16).padStart(2, "0") +
        g.toString(16).padStart(2, "0") +
        b.toString(16).padStart(2, "0"),
    );
    return colorName;
  };

  function hexToColorName(hex: string): string {
    // แปลง hex เป็น rgb
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // เพิ่มฐานข้อมูลสีมาตรฐาน (ตัวอย่างบางส่วน)
    const colors = [
      { name: "สีดำ", rgb: [0, 0, 0] },
      { name: "สีขาว", rgb: [255, 255, 255] },
      { name: "สีแดง", rgb: [255, 0, 0] },
      { name: "สีแดงอ่อน", rgb: [255, 102, 102] },
      { name: "สีแดงเข้ม", rgb: [139, 0, 0] },
      { name: "สีแดงเลือด", rgb: [178, 34, 34] },
      { name: "สีแดงกุหลาบ", rgb: [255, 0, 127] },
      { name: "สีเขียว", rgb: [0, 128, 0] },
      { name: "สีเขียวอ่อน", rgb: [144, 238, 144] },
      { name: "สีเขียวเข้ม", rgb: [0, 100, 0] },
      { name: "สีเขียวป่า", rgb: [34, 139, 34] },
      { name: "สีเขียวหญ้า", rgb: [124, 252, 0] },
      { name: "สีเขียวโคบอลต์", rgb: [61, 145, 64] },
      { name: "สีน้ำเงิน", rgb: [0, 0, 255] },
      { name: "สีฟ้า", rgb: [0, 191, 255] },
      { name: "สีฟ้าอ่อน", rgb: [135, 206, 250] },
      { name: "สีฟ้าเข้ม", rgb: [0, 0, 139] },
      { name: "สีฟ้าสมุทร", rgb: [0, 128, 128] },
      { name: "สีฟ้าเข้มขึ้น", rgb: [25, 25, 112] },
      { name: "สีเหลือง", rgb: [255, 255, 0] },
      { name: "สีทอง", rgb: [255, 215, 0] },
      { name: "สีทองอ่อน", rgb: [255, 239, 213] },
      { name: "สีส้ม", rgb: [255, 165, 0] },
      { name: "สีส้มอ่อน", rgb: [255, 200, 124] },
      { name: "สีส้มเข้ม", rgb: [255, 140, 0] },
      { name: "สีส้มแดง", rgb: [255, 69, 0] },
      { name: "สีม่วง", rgb: [128, 0, 128] },
      { name: "สีม่วงอ่อน", rgb: [221, 160, 221] },
      { name: "สีม่วงเข้ม", rgb: [75, 0, 130] },
      { name: "สีชมพู", rgb: [255, 192, 203] },
      { name: "สีชมพูอ่อน", rgb: [255, 182, 193] },
      { name: "สีชมพูเข้ม", rgb: [199, 21, 133] },
      { name: "สีน้ำตาล", rgb: [165, 42, 42] },
      { name: "สีน้ำตาลอ่อน", rgb: [205, 133, 63] },
      { name: "สีน้ำตาลเข้ม", rgb: [101, 67, 33] },
      { name: "สีเทา", rgb: [128, 128, 128] },
      { name: "สีเทาอ่อน", rgb: [211, 211, 211] },
      { name: "สีเทาเข้ม", rgb: [64, 64, 64] },
      { name: "สีเทาซิลเวอร์", rgb: [192, 192, 192] },

      // ===== กลุ่มแดงเพิ่มเติม =====
      { name: "สีแดงเบอร์กันดี", rgb: [128, 0, 32] },
      { name: "สีแดงไวน์", rgb: [114, 47, 55] },
      { name: "สีแดงอิฐ", rgb: [178, 34, 34] },

      // ===== กลุ่มชมพูเพิ่มเติม =====
      { name: "สีพีช", rgb: [255, 218, 185] },
      { name: "สีโรสโกลด์", rgb: [183, 110, 121] },

      // ===== กลุ่มส้มเพิ่มเติม =====
      { name: "สีแอปริคอต", rgb: [251, 206, 177] },
      { name: "สีคอรัล", rgb: [255, 127, 80] },

      // ===== กลุ่มเหลืองเพิ่มเติม =====
      { name: "สีเหลืองมัสตาร์ด", rgb: [255, 219, 88] },
      { name: "สีครีม", rgb: [255, 253, 208] },

      // ===== กลุ่มเขียวเพิ่มเติม =====
      { name: "สีเขียวมิ้นต์", rgb: [152, 255, 152] },
      { name: "สีเขียวมะกอก", rgb: [128, 128, 0] },
      { name: "สีเขียวหยก", rgb: [0, 168, 107] },
      { name: "สีเขียวพิสตาชิโอ", rgb: [147, 197, 114] },

      // ===== กลุ่มฟ้า/น้ำเงินเพิ่มเติม =====
      { name: "สีคราม", rgb: [75, 0, 130] },
      { name: "สีอินดิโก", rgb: [63, 0, 255] },
      { name: "สีเทอร์ควอยซ์", rgb: [64, 224, 208] },
      { name: "สีไซแอน", rgb: [0, 255, 255] },
      { name: "สีฟ้าเทอร์ควอยซ์อ่อน", rgb: [175, 238, 238] },

      // ===== กลุ่มม่วงเพิ่มเติม =====
      { name: "สีลาเวนเดอร์", rgb: [230, 230, 250] },
      { name: "สีม่วงพลัม", rgb: [142, 69, 133] },

      // ===== กลุ่มน้ำตาลเพิ่มเติม =====
      { name: "สีเบจ", rgb: [245, 245, 220] },
      { name: "สีช็อกโกแลต", rgb: [210, 105, 30] },
      { name: "สีกาแฟ", rgb: [111, 78, 55] },

      // ===== กลุ่มเทาเพิ่มเติม =====
      { name: "สีเทาชาร์โคล", rgb: [54, 69, 79] },
      { name: "สีเทาอมฟ้า", rgb: [119, 136, 153] },

      // ===== กลุ่มพิเศษ =====
      { name: "สีงาช้าง", rgb: [255, 255, 240] },
      { name: "สีควันบุหรี่", rgb: [115, 130, 118] },
      { name: "สีทะเลลึก", rgb: [0, 51, 102] },
      { name: "สีมรกต", rgb: [80, 200, 120] },
    ];

    // หา color ที่ใกล้ที่สุด
    let minDist = Infinity;
    let closest = "ไม่ทราบชื่อสี";
    colors.forEach((c) => {
      const dist = Math.sqrt(
        Math.pow(r - c.rgb[0], 2) +
          Math.pow(g - c.rgb[1], 2) +
          Math.pow(b - c.rgb[2], 2),
      );
      if (dist < minDist) {
        minDist = dist;
        closest = c.name;
      }
    });
    return closest;
  }

  return (
    <div className="w-full h-full p-4">
      {/* แถบสีใหญ่ด้านล่าง - แสดง pattern หลัก */}
      {colorPatterns.patterns.length > 0 && (
        <div className="flex">
          {colorPatterns.patterns[0].map((color: string, colorIdx: number) => (
            <div
              key={colorIdx}
              className="flex-1 h-10"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}

        </div>
      )}
      <h2 className="text-lg font-bold mb-4 text-gray-800 mt-6">
        Pattern การผสมสี ({colorPatterns.patterns.length} รูปแบบ)
      </h2>

      {/* Grid สำหรับ color patterns */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {colorPatterns.patterns.map((pattern, idx) => (
          <div key={idx} className="relative group">
            <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200">
              {pattern.map((color: string, colorIdx: number) => (
                <div
                  key={colorIdx}
                  className="flex-1 h-8 hover:scale-105 transition-transform cursor-pointer group/color"
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  <span className="text-xs text-white font-medium px-2">
                    {hexToColorName(color)}
                  </span>
                </div>
              ))}
            </div>
            {/* ปุ่มคัดลอก */}
            <div
              className="cursor-pointer absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 bg-opacity-50 flex items-center justify-center rounded-lg transition-opacity duration-200"
              title="คัดลอกรหัสสี"
            >
              {copiedIndex === idx ? (
                <span className="text-white text-xs font-medium bg-green-500 px-2 py-1 rounded">
                  คัดลอกแล้ว!
                </span>
              ) : (
                <div className="relative">
                  <span className="text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                    <Copy className="w-4 h-4 inline-block mr-1" />
                  </span>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-10 hidden group-hover:block">
                    <div
                      onClick={() =>
                        copyToClipboard(pattern, idx, "background")
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      คัดลอกเป็น Background
                    </div>
                    <div
                      onClick={() =>
                        copyToClipboard(pattern, idx, "foreground")
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      คัดลอกเป็น Foreground
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* สร้าง สัดส่วนการใช้สี  4 แบบ*/}
      <div className="mt-4 text-sm text-gray-600">
        <h2 className="text-lg font-bold mb-4 text-gray-800">
          สัดส่วนการใช้สีใน Pattern หลัก
        </h2>

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {colorPatterns.percentagePatterns
            .slice(0, 4)
            .map((percentages, idx) => (
              <div key={idx} className="flex justify-center">
                <div className="flex flex-col w-full items-center">
                  {percentages.map((pct, pctIdx) => (
                    <div
                      key={pctIdx}
                      className="w-full mb-1 px-2 flex items-center"
                      style={{
                        height: `${pct * 2}px`,
                        backgroundColor:
                          colorPatterns.patterns[0][pctIdx] || "#ffffff",
                      }}
                      title={`${pct}% - ${
                        colorPatterns.patterns[0][pctIdx] || "#ffffff"
                      }`}
                    >
                      <span className="text-xs text-white font-medium px-2">
                        {hexToColorName(
                          colorPatterns.patterns[0][pctIdx] || "#ffffff",
                        )}{" "}
                        ({pct}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
