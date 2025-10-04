"use client";
import React, { useState, useRef, useEffect } from "react";
import { ColorPattern } from "./ColorPattern";

interface ColorWheelHarmonyProps {
  baseColor: string[];
  onSendData: (data: Array<number>) => void;
  harmonyType: string;
}

const ColorHarmonyWheel = ({
  baseColor,
  onSendData,
  harmonyType,
}: ColorWheelHarmonyProps) => {
  const [baseHue, setBaseHue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getHarmonyColors = (hue: number, type: string) => {
    const colors: Array<number> = [];
    switch (type) {
      case "monochromatic":
        colors.push(hue);
        break;
      case "analogous":
        colors.push(hue, (hue + 30) % 360, (hue - 30 + 90) % 360);
        break;
      case "complementary":
        colors.push(hue, (hue + 180) % 360);
        break;
      case "split-complementary":
        colors.push(hue, (hue + 150) % 360, (hue + 210) % 360);
        break;
      case "triadic":
        colors.push(hue, (hue + 120) % 360, (hue + 240) % 360);
        break;
      case "tetradic":
        colors.push(
          hue,
          (hue + 60) % 360,
          (hue + 180) % 360,
          (hue + 240) % 360
        );
        break;
      case "square":
        colors.push(
          hue,
          (hue + 90) % 360,
          (hue + 180) % 360,
          (hue + 270) % 360
        );
        break;
      default:
        colors.push(hue);
    }
    return colors;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging && e.type !== "click") return;

    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 90 + 360) % 360;
    setBaseHue(Math.round(angle));
  };

  const harmonyColors = getHarmonyColors(baseHue, harmonyType);

  const renderColorWheel = () => {
    const segments = 12;
    const radius = 200;
    const centerX = 250;
    const centerY = 250;

    return (
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        className="cursor-pointer max-w-[500px] max-h-[500px] w-full h-auto"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onClick={(e) => {
          handleMouseMove(e);
          onSendData(harmonyColors);
        }}
      >
        {/* 12 color segments */}
        {Array.from({ length: segments }).map((_, i) => {
          const startAngle = (i * 30 - 90) * (Math.PI / 180);
          const endAngle = ((i + 1) * 30 - 90) * (Math.PI / 180);

          const x1 = centerX + radius * Math.cos(startAngle);
          const y1 = centerY + radius * Math.sin(startAngle);
          const x2 = centerX + radius * Math.cos(endAngle);
          const y2 = centerY + radius * Math.sin(endAngle);

          return (
            <path
              key={i}
              d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`}
              fill={baseColor[i]}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Harmony indicators */}
        {harmonyColors.map((hue, idx) => {
          const angle = (hue - 90) * (Math.PI / 180);
          const markerRadius = radius + 20;
          const x = centerX + markerRadius * Math.cos(angle);
          const y = centerY + markerRadius * Math.sin(angle);

          return (
            <g key={idx}>
              <circle
                cx={x}
                cy={y}
                r="13"
                // fill={`hsl(${hue}, 100%, 50%)`}
                fill={baseColor[Math.floor(hue / 30) % 12]}
                stroke="white"
                strokeWidth="3"
                className="cursor-pointer"
              />
              {idx === 0 && (
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="white"
                  className="pointer-events-none"
                />
              )}
            </g>
          );
        })}

        {/* Lines connecting harmony colors */}
        {harmonyColors.length > 1 &&
          harmonyColors.map((hue, idx) => {
            const nextHue = harmonyColors[(idx + 1) % harmonyColors.length];
            const angle1 = (hue - 90) * (Math.PI / 180);
            const angle2 = (nextHue - 90) * (Math.PI / 180);

            const x1 = centerX + (radius - 10) * Math.cos(angle1);
            const y1 = centerY + (radius - 10) * Math.sin(angle1);
            const x2 = centerX + (radius - 10) * Math.cos(angle2);
            const y2 = centerY + (radius - 10) * Math.sin(angle2);

            return (
              <line
                key={`line-${idx}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                strokeDasharray="4,4"
                className="pointer-events-none"
              />
            );
          })}
      </svg>
    );
  };

  if (!isMounted) return null;

  return (
  <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 md:flex-row md:gap-12">
      <div className="w-full">
        {renderColorWheel()}
      </div>
      <ColorPattern harmonyColors={harmonyColors} baseColor={baseColor} harmonyType={harmonyType} />
    </div>
  );
};

export default ColorHarmonyWheel;
