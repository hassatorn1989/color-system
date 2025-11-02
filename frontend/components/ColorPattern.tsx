import React, { useMemo, useState } from "react";
import { Copy } from "lucide-react";
interface ColorPatternProps {
  harmonyColors: number[];
  baseColor: string[];
  harmonyType: string;
}

export const ColorPattern: React.FC<ColorPatternProps> = ({ harmonyColors, baseColor, harmonyType }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (colors: string[], index: number) => {
    try {
      const colorString = colors.join(', ');
      await navigator.clipboard.writeText(colorString);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy colors: ', err);
    }
  };

  // สร้าง color patterns ตามจำนวนสีใน harmony type (ใช้ useMemo เพื่อ performance)
  const colorPatterns = useMemo(() => {
    const patterns = [];
    
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
        let h = 0, s = 0, l = (max + min) / 2;
        
        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        return [h * 360, s * 100, l * 100];
      };
      
      const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n: number) => {
          const k = (n + h / 30) % 12;
          const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
          return Math.round(255 * color).toString(16).padStart(2, '0');
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
        hslToHex(hue, saturation, Math.min(lightness + 20, 90))  // อ่อนที่สุด
      ];
      
      // สร้าง pattern หลายแบบสำหรับ monochromatic
      patterns.push(monochromaticShades); // pattern หลัก (เข้มไปอ่อน)
      patterns.push([...monochromaticShades].reverse()); // อ่อนไปเข้ม
      
      // สร้าง patterns เพิ่มเติมด้วยการปรับ saturation
      for (let i = 0; i < 6; i++) {
        const adjustedSaturation = Math.max(10, Math.min(100, saturation + (i - 3) * 15));
        const adjustedShades = [
          hslToHex(hue, adjustedSaturation, Math.max(lightness - 30, 10)),
          hslToHex(hue, adjustedSaturation, Math.max(lightness - 15, 20)),
          hslToHex(hue, adjustedSaturation, lightness),
          hslToHex(hue, adjustedSaturation, Math.min(lightness + 20, 90))
        ];
        patterns.push(adjustedShades);
      }
      
      // สร้าง patterns เพิ่มเติมด้วยการปรับ lightness
      for (let i = 0; i < 12; i++) {
        const baseLightness = 20 + (i * 6);
        const adjustedShades = [
          hslToHex(hue, saturation, baseLightness),
          hslToHex(hue, saturation, Math.min(baseLightness + 15, 90)),
          hslToHex(hue, saturation, Math.min(baseLightness + 30, 95)),
          hslToHex(hue, saturation, Math.min(baseLightness + 45, 98))
        ];
        patterns.push(adjustedShades);
      }
      
    } else {
      // สร้าง pattern หลักจาก harmony colors (สำหรับ harmony types อื่นๆ)
      const mainPattern = harmonyColors.map(hue => {
        const colorIndex = Math.floor(hue / 30) % 12;
        return baseColor[colorIndex];
      });
      patterns.push(mainPattern);
      
      // สร้าง pattern หลากหลายด้วยการเลื่อนสีในหลายๆ องศา
      const shifts = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
      
      shifts.forEach(shift => {
        const shiftedPattern = harmonyColors.map(hue => {
          const shiftedIndex = Math.floor((hue + shift) / 30) % 12;
          return baseColor[shiftedIndex];
        });
        patterns.push(shiftedPattern);
      });
      
      // สร้าง patterns แบบ reverse order
      const reversePattern = [...mainPattern].reverse();
      patterns.push(reversePattern);
      
      // สร้าง patterns แบบ alternate (สลับสี)
      if (harmonyColors.length >= 2) {
        const alternatePattern1 = harmonyColors.map((hue, idx) => {
          const shift = idx % 2 === 0 ? 45 : -45;
          const shiftedIndex = Math.floor((hue + shift + 360) / 30) % 12;
          return baseColor[shiftedIndex];
        });
        patterns.push(alternatePattern1);
        
        const alternatePattern2 = harmonyColors.map((hue, idx) => {
          const shift = idx % 2 === 0 ? 90 : -90;
          const shiftedIndex = Math.floor((hue + shift + 360) / 30) % 12;
          return baseColor[shiftedIndex];
        });
        patterns.push(alternatePattern2);
      }
      
      // สร้าง patterns แบบ step progression
      for (let step = 15; step <= 75 && patterns.length < 19; step += 15) {
        const stepPattern = harmonyColors.map((hue, idx) => {
          const progression = step * idx;
          const shiftedIndex = Math.floor((hue + progression) / 30) % 12;
          return baseColor[shiftedIndex];
        });
        patterns.push(stepPattern);
      }
      
      // สร้าง pattern สุดท้ายด้วยการผสมแบบ golden ratio
      if (patterns.length < 20) {
        const goldenRatioPattern = harmonyColors.map((hue, idx) => {
          const goldenShift = (idx * 137.5) % 360; // Golden angle
          const shiftedIndex = Math.floor((hue + goldenShift) / 30) % 12;
          return baseColor[shiftedIndex];
        });
        patterns.push(goldenRatioPattern);
      }
      
      // กรองสีที่ซ้ำออกและตรวจสอบให้แน่ใจว่ามี 20 patterns
      const uniquePatterns = [];
      const seenPatterns = new Set();
      
      for (const pattern of patterns) {
        const patternKey = JSON.stringify(pattern);
        if (!seenPatterns.has(patternKey)) {
          seenPatterns.add(patternKey);
          uniquePatterns.push(pattern);
          if (uniquePatterns.length >= 20) break;
        }
      }
      
      // หากยังไม่ครบ 20 ให้สร้างเพิ่ม (มี safety counter เพื่อป้องกัน infinite loop)
      let attempts = 0;
      const maxAttempts = 100;
      
      while (uniquePatterns.length < 20 && attempts < maxAttempts) {
        attempts++;
        const randomShift = Math.floor(Math.random() * 360);
        const randomPattern = harmonyColors.map(hue => {
          const shiftedIndex = Math.floor((hue + randomShift) / 30) % 12;
          return baseColor[shiftedIndex];
        });
        
        const patternKey = JSON.stringify(randomPattern);
        if (!seenPatterns.has(patternKey)) {
          seenPatterns.add(patternKey);
          uniquePatterns.push(randomPattern);
        }
      }
      
      // หากยังไม่ครบ 20 ให้เติมด้วย pattern ที่มีการ duplicate
      while (uniquePatterns.length < 20 && uniquePatterns.length > 0) {
        const sourceIndex = uniquePatterns.length % Math.min(uniquePatterns.length, 5);
        const basePattern: string[] = uniquePatterns[sourceIndex];
        if (basePattern && basePattern.length > 0) {
          uniquePatterns.push([...basePattern]);
        } else {
          break;
        }
      }
      
      return uniquePatterns.slice(0, 20);
    }
    
    return patterns.slice(0, 20);
    
    // กรองสีที่ซ้ำออกและตรวจสอบให้แน่ใจว่ามี 20 patterns
    // const uniquePatterns = [];
    // const seenPatterns = new Set();
    
    // for (const pattern of patterns) {
    //   const patternKey = JSON.stringify(pattern);
    //   if (!seenPatterns.has(patternKey)) {
    //     seenPatterns.add(patternKey);
    //     uniquePatterns.push(pattern);
    //     if (uniquePatterns.length >= 20) break;
    //   }
    // }
    
    // // หากยังไม่ครบ 20 ให้สร้างเพิ่ม (มี safety counter เพื่อป้องกัน infinite loop)
    // let attempts = 0;
    // const maxAttempts = 100;
    
    // while (uniquePatterns.length < 20 && attempts < maxAttempts) {
    //   attempts++;
    //   const randomShift = Math.floor(Math.random() * 360);
    //   const randomPattern = harmonyColors.map(hue => {
    //     const shiftedIndex = Math.floor((hue + randomShift) / 30) % 12;
    //     return baseColor[shiftedIndex];
    //   });
      
    //   const patternKey = JSON.stringify(randomPattern);
    //   if (!seenPatterns.has(patternKey)) {
    //     seenPatterns.add(patternKey);
    //     uniquePatterns.push(randomPattern);
    //   }
    // }
    
    // // หากยังไม่ครบ 20 ให้เติมด้วย pattern ที่มีการ duplicate
    // while (uniquePatterns.length < 20 && uniquePatterns.length > 0) {
    //   const sourceIndex = uniquePatterns.length % Math.min(uniquePatterns.length, 5);
    //   const basePattern: string[] = uniquePatterns[sourceIndex];
    //   if (basePattern && basePattern.length > 0) {
    //     uniquePatterns.push([...basePattern]);
    //   } else {
    //     break;
    //   }
    // }
    
    // return uniquePatterns.slice(0, 20);
  }, [harmonyColors, baseColor, harmonyType]);

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Pattern การผสมสี ({colorPatterns.length} รูปแบบ)
      </h2>
      
      {/* Grid สำหรับ color patterns */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {colorPatterns.map((pattern, idx) => (
          <div key={idx} className="relative group">
            <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200">
              {pattern.map((color: string, colorIdx: number) => (
                <div
                  key={colorIdx}
                  className="flex-1 h-8 hover:scale-105 transition-transform cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={`Pattern ${idx + 1}, Color ${colorIdx + 1}: ${color}`}
                />
              ))}
            </div>
            {/* ปุ่มคัดลอก */}
            <button
              onClick={() => copyToClipboard(pattern, idx)}
              className="cursor-pointer absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 bg-opacity-50 flex items-center justify-center rounded-lg transition-opacity duration-200"
              title="คัดลอกรหัสสี"
            >
              {copiedIndex === idx ? (
                <span className="text-white text-xs font-medium bg-green-500 px-2 py-1 rounded">
                  คัดลอกแล้ว!
                </span>
              ) : (
                <span className="text-white text-xs font-medium  px-2 py-1 rounded">
                    <Copy className="w-4 h-4 inline-block mr-1" />
                </span>
              )}
            </button>
          </div>
        ))}
      </div>
      
      {/* แถบสีใหญ่ด้านล่าง - แสดง pattern หลัก */}
      {colorPatterns.length > 0 && (
        <div className="flex">
          {colorPatterns[0].map((color: string, colorIdx: number) => (
            <div
              key={colorIdx}
              className="flex-1 h-10"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}

    </div>
  );
};