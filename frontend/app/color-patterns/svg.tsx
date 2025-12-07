'use client';

import { ReactElement } from "react";
interface SvgComponentsProps {
  svg: string;
  foregroundColor?: {readonly r: number; readonly g: number; readonly b: number; readonly a: number;} | string;
  backgroundColor?: {readonly r: number; readonly g: number; readonly b: number; readonly a: number;} | string;
}
export function SvgComponents({ svg, foregroundColor, backgroundColor }: SvgComponentsProps): ReactElement {
  function rgbToHex(r: number, g: number, b: number, a: number): string {
    const toHex = (c: number) => {
      const hex = c?.toString(16).padStart(2, "0");
      return hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.round(a * 255))}`.toUpperCase();
  }
  const hexColor = rgbToHex(
    foregroundColor instanceof Object ? foregroundColor.r : 0,
    foregroundColor instanceof Object ? foregroundColor.g : 0,
    foregroundColor instanceof Object ? foregroundColor.b : 0,
    foregroundColor instanceof Object ? foregroundColor.a : 1
  );
  const customSvg = svg
    .replace(/fill=".*?"/g, `fill="${hexColor}"`)
    .replace(/height=".*?"/g, 'height="50px"')
    .replace(/width=".*?"/g, 'width="50px"');

  
  return (
    <pre
      style={{
        backgroundImage: `url(${`data:image/svg+xml;utf8,${encodeURIComponent(
          customSvg
        )}`})`,
        backgroundColor: rgbToHex(backgroundColor instanceof Object ? backgroundColor.r : 255, backgroundColor instanceof Object ? backgroundColor.g : 255, backgroundColor instanceof Object ? backgroundColor.b : 255, backgroundColor instanceof Object ? backgroundColor.a : 1),
        color: "transparent",
        height: "100%",
        width: "100%",
      }}
      className="rounded-2xl block"
    />
  );
}
