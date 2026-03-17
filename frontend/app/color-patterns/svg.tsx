'use client';

import { ReactElement, useMemo } from "react";
import { colorizeSvgMarkup } from "@/lib/svg-utils";

interface SvgComponentsProps {
  svg: string;
  foregroundColor?: { readonly r: number; readonly g: number; readonly b: number; readonly a: number } | string;
  backgroundColor?: { readonly r: number; readonly g: number; readonly b: number; readonly a: number } | string;
}

function rgbaToCssColor(r: number, g: number, b: number, a: number): string {
  if (a >= 0.999) {
    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function SvgComponents({ svg, foregroundColor, backgroundColor }: SvgComponentsProps): ReactElement {
  const foregroundCssColor =
    typeof foregroundColor === "string"
      ? foregroundColor
      : rgbaToCssColor(
          foregroundColor?.r ?? 0,
          foregroundColor?.g ?? 0,
          foregroundColor?.b ?? 0,
          foregroundColor?.a ?? 1
        );

  const backgroundCssColor =
    typeof backgroundColor === "string"
      ? backgroundColor
      : rgbaToCssColor(
          backgroundColor?.r ?? 255,
          backgroundColor?.g ?? 255,
          backgroundColor?.b ?? 255,
          backgroundColor?.a ?? 1
        );

  const customSvg = useMemo(
    () => colorizeSvgMarkup(svg, foregroundCssColor, { width: 50, height: 50 }) ?? "",
    [svg, foregroundCssColor]
  );

  return (
    <pre
      style={{
        backgroundImage: customSvg
          ? `url(${`data:image/svg+xml;utf8,${encodeURIComponent(customSvg)}`})`
          : "none",
        backgroundColor: backgroundCssColor,
        color: "transparent",
        height: "100%",
        width: "100%",
      }}
      className="rounded-2xl block"
    />
  );
}
