"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type LevelResult = {
  passNormalAA: boolean;
  passNormalAAA: boolean;
  passLargeAA: boolean;
  passLargeAAA: boolean;
};

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function hexToRgb(hex: string) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h.split("").map((c) => c + c).join("");
  }
  const int = parseInt(h || "000000", 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return { r, g, b };
}

function srgbToLinear(c: number) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbToLinear(r);
  const G = srgbToLinear(g);
  const B = srgbToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(bgHex: string, fgHex: string) {
  const L1 = relativeLuminance(bgHex);
  const L2 = relativeLuminance(fgHex);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function evaluateLevels(ratio: number): LevelResult {
  return {
    passNormalAA: ratio >= 4.5,
    passNormalAAA: ratio >= 7,
    passLargeAA: ratio >= 3,
    passLargeAAA: ratio >= 4.5,
  };
}

// Try nudging foreground toward black/white to hit target ratio.
function suggestForeground(bgHex: string, fgHex: string, target = 4.5) {
  const tryToward = (dest: string) => {
    let lo = 0;
    let hi = 1;
    let best = fgHex;

    const mix = (a: string, b: string, t: number) => {
      const A = hexToRgb(a);
      const B = hexToRgb(b);
      const r = Math.round(A.r * (1 - t) + B.r * t);
      const g = Math.round(A.g * (1 - t) + B.g * t);
      const b2 = Math.round(A.b * (1 - t) + B.b * t);
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      return `#${toHex(r)}${toHex(g)}${toHex(b2)}`.toUpperCase();
    };

    // binary search on t in [0,1]
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      const test = mix(fgHex, dest, mid);
      const cr = contrastRatio(bgHex, test);
      if (cr >= target) {
        best = test;
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return best;
  };

  const toBlack = tryToward("#000000");
  const toWhite = tryToward("#FFFFFF");

  const crBlack = contrastRatio(bgHex, toBlack);
  const crWhite = contrastRatio(bgHex, toWhite);

  // Prefer the smaller visual change that still reaches target; if both pass, pick closer one to original fg in RGB distance
  const dist = (a: string, b: string) => {
    const A = hexToRgb(a), B = hexToRgb(b);
    return Math.hypot(A.r - B.r, A.g - B.g, A.b - B.b);
  };

  const passBlack = crBlack >= target;
  const passWhite = crWhite >= target;

  if (!passBlack && !passWhite) {
    // Return the better of the two anyway
    return crBlack > crWhite ? toBlack : toWhite;
  }
  if (passBlack && passWhite) {
    const dBlack = dist(fgHex, toBlack);
    const dWhite = dist(fgHex, toWhite);
    return dBlack <= dWhite ? toBlack : toWhite;
  }
  return passBlack ? toBlack : toWhite;
}

export default function ContrastChecker() {
  const [bg, setBg] = React.useState("#0EA5E9"); // sky-500
  const [fg, setFg] = React.useState("#0B1220"); // slate-950-ish
  const [isLarge, setIsLarge] = React.useState(false); // >= 18.66px regular or >= 14px bold
  const [isBold, setIsBold] = React.useState(false);

  const ratio = React.useMemo(() => contrastRatio(bg, fg), [bg, fg]);
  const levels = evaluateLevels(ratio);

  const previewStyle: React.CSSProperties = {
    backgroundColor: bg,
    color: fg,
    fontWeight: isBold ? 700 : 400,
    fontSize: isLarge ? 20 : 16,
    lineHeight: 1.5,
    borderRadius: 8,
    padding: 16,
  };

  const onSwap = () => {
    setBg(fg);
    setFg(bg);
  };

  const onSuggestAA = () => {
    const suggestion = suggestForeground(bg, fg, isLarge ? 3 : 4.5);
    setFg(suggestion);
  };

  const onSuggestAAA = () => {
    const suggestion = suggestForeground(bg, fg, isLarge ? 4.5 : 7);
    setFg(suggestion);
  };

  const ratioText = `${ratio.toFixed(2)}:1`;

  const Tag = ({ ok, label }: { ok: boolean; label: string }) => (
    <Badge
      variant={ok ? "default" : "secondary"}
      className={ok ? "bg-green-600" : "bg-red-600 text-white"}
    >
      {label} {ok ? "✓" : "✗"}
    </Badge>
  );

  return (
    <Card className="w-full accessibility-content">
      <CardHeader>
        <CardTitle>Contrast Checker (WCAG)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bg">Background</Label>
            <div className="flex gap-2">
              <Input
                id="bg"
                value={bg.toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#?[0-9a-fA-F]{0,6}$/.test(v.replace("#", ""))) {
                    setBg(("#" + v.replace("#", "")).toUpperCase());
                  }
                }}
                placeholder="#FFFFFF"
              />
              <Input
                type="color"
                aria-label="Pick background color"
                value={bg}
                onChange={(e) => setBg(e.target.value.toUpperCase())}
                className="w-12 p-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fg">Text</Label>
            <div className="flex gap-2">
              <Input
                id="fg"
                value={fg.toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#?[0-9a-fA-F]{0,6}$/.test(v.replace("#", ""))) {
                    setFg(("#" + v.replace("#", "")).toUpperCase());
                  }
                }}
                placeholder="#000000"
              />
              <Input
                type="color"
                aria-label="Pick text color"
                value={fg}
                onChange={(e) => setFg(e.target.value.toUpperCase())}
                className="w-12 p-1"
              />
            </div>
          </div>
        </div>

        {/* toggles */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <Switch id="isLarge" checked={isLarge} onCheckedChange={setIsLarge} />
            <Label htmlFor="isLarge">Large text (≥20px reg | ≥16px bold)</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="isBold" checked={isBold} onCheckedChange={setIsBold} />
            <Label htmlFor="isBold">Bold</Label>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="secondary" onClick={onSwap}>Swap</Button>
          <Button onClick={onSuggestAA}>Suggest to AA</Button>
          <Button variant="outline" onClick={onSuggestAAA}>Suggest to AAA</Button>
        </div>

        {/* ratio + badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-sm font-medium">
            Contrast Ratio: <span className="font-semibold">{ratioText}</span>
          </div>
          <Tag ok={levels.passNormalAA} label="AA Normal (≥4.5:1)" />
          <Tag ok={levels.passNormalAAA} label="AAA Normal (≥7:1)" />
          <Tag ok={levels.passLargeAA} label="AA Large (≥3:1)" />
          <Tag ok={levels.passLargeAAA} label="AAA Large (≥4.5:1)" />
        </div>

        {/* preview */}
        <div className="space-y-2">
          <Label>Preview</Label>
          <div style={previewStyle}>
            <div className="text-sm opacity-85 mb-2">
              The quick brown fox jumps over the lazy dog — 0123456789
            </div>
            <div className="font-semibold">Heading • ตัวอย่างหัวข้อภาษาไทย</div>
            <p className="mt-1">
              ข้อความตัวอย่างเพื่อดูความต่างของสีและความอ่านง่าย
              ปรับขนาด/น้ำหนักตัวอักษรด้านบนเพื่อทดสอบเกณฑ์ AA/AAA
            </p>
            <a href="#" style={{ color: fg, textDecoration: "underline" }}>Example link</a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
