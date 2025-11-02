"use client";
import React, { useState, useRef, useEffect } from "react";
import { ColorPattern } from "./ColorPattern";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { GroupColor } from "@/lib/generated/prisma/wasm";

interface ColorWheelHarmonyProps {
  baseColor: string[];
  onSendData: (data: Array<number>) => void;
  harmonyType: string;
  groupColor: GroupColor[];
  groupColorId: string;
  selectColor: (id: string) => void;
}

const ColorHarmonyWheel = ({
  baseColor,
  onSendData,
  harmonyType,
  groupColor,
  groupColorId,
  selectColor,
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
    // <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 md:flex-row md:gap-12">
    //     <div className="w-full">
    //       {renderColorWheel()}
    //     </div>
    //     <ColorPattern harmonyColors={harmonyColors} baseColor={baseColor} harmonyType={harmonyType} />
    //   </div>mb-6
    <>
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Interactive Wheel */}
        <div className="flex flex-col ">
          <Card className="p-8 bg-card border-border w-full">
           <Select
              value={groupColorId}
              onValueChange={(value) => selectColor(value)}
              className="w-full mb-6"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกชุดสีพื้นฐาน" />
              </SelectTrigger>
              <SelectContent>
                {groupColor.map((groupColor, index) => (
                  <SelectItem key={index} value={groupColor.id}>
                    {groupColor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex justify-center mb-8">{renderColorWheel()}</div>

            {/* Slider for wheel interaction */}
            {/* <div className="space-y-3">
              <Label className="text-foreground font-medium">หมุนวงจร</Label>
              <input
                type="range"
                min="0"
                max="330"
                step="30"
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #EF4444 0%, #F97316 8%, #FB923C 16%, #FBBF24 25%, #BFDBFE 33%, #4ADE80 41%, #22D3EE 50%, #3B82F6 58%, #A855F7 66%, #EC4899 75%, #F472B6 83%, #FB7185 91%, #EF4444 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-foreground/60">
                <span>0°</span>
                <span>180°</span>
                <span>330°</span>
              </div>
            </div> */}
          </Card>
        </div>

        {/* Color Information */}
        <div className="space-y-6">
          {/* Selected Color Display */}
          <Card className="overflow-hidden border-border">
            <ColorPattern
              harmonyColors={harmonyColors}
              baseColor={baseColor}
              harmonyType={harmonyType}
            />
          </Card>

          {/* Color Theory Info */}
          <Card className="p-6 bg-card border-border">
            <h4 className="text-lg font-semibold text-foreground mb-3">
              พื้นฐานทฤษฎีสี
            </h4>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                <span>
                  <strong>สีหลัก:</strong> สีแดง สีเหลือง สีน้ำเงิน -
                  ไม่สามารถผสมจากสีอื่น
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                <span>
                  <strong>สีรอง:</strong> สีส้ม สีเขียว สีม่วง -
                  ทำจากผสมสีหลักสองสี
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary font-bold">•</span>
                <span>
                  <strong>สีทุติยภูมิ:</strong> ทำจากผสมสีหลักและสีรอง
                </span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ColorHarmonyWheel;
