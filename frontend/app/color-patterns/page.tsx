"use client";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ZoomOut, ZoomIn, RefreshCcw, X, Pyramid, Badge } from "lucide-react";
import { useEffect, useState } from "react";
import { RgbaColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SvgComponents } from "./svg";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface Pattern {
  id: number;
  name: string;
  file_name: string;
  file_path: string;
  svg: string;
}

// แปลง HEX เป็น RGB
const hexToRgb = (hex: string) => {
  hex = hex.replace('#', '').trim();

  if (![3, 6].includes(hex.length)) {
    throw new Error(`Invalid HEX color: ${hex}`);
  }

  // #abc → #aabbcc
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  const value = parseInt(hex, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

// ผสม HEX หลายสี
const mixHexColors = (hexColors: string[], alpha = 1) => {
  if (!hexColors || hexColors.length === 0) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  const rgbs = hexColors.map(hexToRgb);
  const len = rgbs.length;

  const r = Math.round(rgbs.reduce((s, c) => s + c.r, 0) / len);
  const g = Math.round(rgbs.reduce((s, c) => s + c.g, 0) / len);
  const b = Math.round(rgbs.reduce((s, c) => s + c.b, 0) / len);

  return {
    r: r,
    g: g,
    b: b,
    a: alpha,
  };
};


// import Overcast from "../assets/overcast.svg";
export default function Page() {
  const [scale, setScale] = useState(1);
  // Color picker state
  const [foregroundColor, setForegroundColor] = useState(
    "#000000,#000000,#000000,#000000"
  );
  const [backgroundColor, setBackgroundColor] = useState(
    "#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF"
  );

  const [foregroundColorRGBA, setForegroundColorRGBA] = useState({
    r: 255,
    g: 87,
    b: 51,
    a: 1,
  });
  const [backgroundColorRGBA, setBackgroundColorRGBA] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  });
  const [svg, setSvg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fileType, setFileType] = useState<"svg" | "image">("svg");
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to control Popover visibility

  useEffect(() => {
    getPattern();
    loadForgroundCopiedColors();
    loadBackgroundCopiedColors();
  }, []);

  function loadForgroundCopiedColors() {
    const savedColors = localStorage.getItem("copiedForegroundColors");
    if (savedColors) {
      setForegroundColor(savedColors);
    }
    const foregroundColorCopies = savedColors
      ?.replace(/\s+/g, "") // ลบช่องว่างทั้งหมด
      .split(","); // แยกเป็น array
    const mixedColor = mixHexColors(foregroundColorCopies || [], 1);
    if (typeof mixedColor === "object" && mixedColor !== null) {
      setForegroundColorRGBA({
        r: mixedColor.r,
        g: mixedColor.g,
        b: mixedColor.b,
        a: mixedColor.a,
      });
    }
  }

  function loadBackgroundCopiedColors() {
    const savedColors = localStorage.getItem("copiedBackgroundColors");
    if (savedColors) {
      setBackgroundColor(savedColors);
    }
    const backgroundColorCopies = savedColors
      ?.replace(/\s+/g, "") // ลบช่องว่างทั้งหมด
      .split(","); // แยกเป็น array
    const mixedColor = mixHexColors(backgroundColorCopies || [], 1);
    if (typeof mixedColor === "object" && mixedColor !== null) {
      setBackgroundColorRGBA({
        r: mixedColor.r,
        g: mixedColor.g,
        b: mixedColor.b,
        a: mixedColor.a,
      });
    }
  }

  function handleZoomIn() {
    setScale((prev) => Math.min(prev + 0.1, 2));
  }

  function handleZoomOut() {
    setScale((prev) => Math.max(prev - 0.1, 1));
  }

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  }

  function handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(false);
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLDivElement>) {
    setIsDragging(false);
  }

  function chooseFile() {
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    input.click();
    input.onchange = () => {
      if (input.files && input.files.length > 0) {
        const formData = new FormData();
        formData.append("file", input.files[0]);
        axios
          .post("/api/pattern", formData) // <- pass FormData ตรง ๆ
          .then((response) => {
            loadBackgroundCopiedColors();
            loadForgroundCopiedColors();
            setSvg(response.data.svg);
          })
          .catch((error) => {
            console.error("เกิดข้อผิดพลาดในการอัปโหลดไฟล์:", error);
          });
        // setSvg(URL.createObjectURL(input.files[0]));
        // input.value = "";
      }
    };
  }

  function getPattern() {
    axios
      .get("/api/pattern")
      .then((response) => {
        setPatterns(response.data.patternsWithSVG);
      })
      .catch((error) => {
        console.error("Error fetching patterns:", {
          message: error.message,
          code: error.code,
          response: error.response,
        });
      });
  }
  function handleExport() {
    if (!svg) {
      alert("Please select a pattern first.");
      return;
    }

    // Create a canvas element for the tiled pattern
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get 2D context from canvas");
      return;
    }

    const width = 1000;
    const height = 500;
    canvas.width = width;
    canvas.height = height;

    // Set background color
    ctx.fillStyle = `rgba(${backgroundColorRGBA.r},${backgroundColorRGBA.g},${backgroundColorRGBA.b},${backgroundColorRGBA.a})`;
    ctx.fillRect(0, 0, width, height);

    // Create colored SVG for the pattern tile
    const coloredSvg = svg
      .replace(
        /fill=".*?"/g,
        `fill="rgba(${foregroundColorRGBA.r.toString()},${foregroundColorRGBA.g.toString()},${foregroundColorRGBA.b.toString()},${foregroundColorRGBA.a.toString()})"`
      )
      .replace(
        /stroke=".*?"/g,
        `stroke="rgba(${foregroundColorRGBA.r.toString()},${foregroundColorRGBA.g.toString()},${foregroundColorRGBA.b.toString()},${foregroundColorRGBA.a.toString()})"`
      )
      .replace(/<svg /, `<svg `);

    // Create an image from the SVG to draw on canvas
    const img = new Image();
    img.onload = () => {
      // Calculate size for each pattern tile
      const tileSize = 50;

      // Draw the pattern repeatedly to fill the canvas
      for (let y = 0; y < height; y += tileSize) {
        for (let x = 0; x < width; x += tileSize) {
          ctx.drawImage(img, x, y, tileSize, tileSize);
        }
      }

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "pattern.png";
          link.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    };

    // Create a data URL from the SVG
    const svgBlob = new Blob([coloredSvg], {
      type: "image/svg+xml;charset=utf-8",
    });
    img.src = URL.createObjectURL(svgBlob);
  }

  function clearColors(type?: "foreground" | "background") {
    if (type === "foreground") {
      setForegroundColorRGBA({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
      setForegroundColor("#000000,#000000,#000000,#000000");
    }
    if (type === "background") {
      setBackgroundColorRGBA({
        r: 255,
        g: 255,
        b: 255,
        a: 1,
      });
      setBackgroundColor("#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF");
    }
  }
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge fontVariant="outline" className="mb-4 px-4 py-2">
              ความสามัคคีของสี
            </Badge>
            <br />
            <span className="text-5xl md:text-6xl font-bold  mb-4 leading-tight text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              แบบรูปสี
            </span>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              สำรวจแบบรูปสีที่พิสูจน์แล้วและการผสมผสานที่ทำงานร่วมกันอย่างลงตัว
              การผสมผสานเหล่านี้ใช้โดยนักออกแบบทั่วโลกเพื่อสร้างองค์ประกอบที่ดึงดูดสายตา
            </p>
          </div>
          <div className="h-[calc(100vh-4rem)] w-full">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel
                maxSize={30}
                minSize={20}
                defaultSize={20}
                className=" p-4 flex flex-col justify-between"
              >
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg no-underline hover:no-underline">
                      <h3 className="font-semibold">Select a Pattern</h3>
                    </AccordionTrigger>
                    <AccordionContent className="accessibility-content flex flex-col gap-4 text-balance">
                      {/* <span className="font-semibold">File Format</span>
                      <div className="flex gap-4 justify-center">
                        <ToggleGroup
                          value={fileType}
                          onValueChange={(value) =>
                            setFileType(value as "svg" | "image")
                          }
                          type="single"
                          className="w-full border"
                        >
                          <ToggleGroupItem value="svg">SVG</ToggleGroupItem>
                          <ToggleGroupItem value="image">Image</ToggleGroupItem>
                        </ToggleGroup>
                      </div> */}
                      <div>
                        <input
                          type="file"
                          accept={
                            fileType === "svg"
                              ? "image/svg+xml"
                              : "image/jpeg, image/jpg, image/png"
                          }
                          className="hidden"
                        />
                        <Button
                          onClick={chooseFile}
                          className="bg-sky-600 w-full hover:bg-sky-700"
                        >
                          Choose File
                        </Button>
                      </div>
                      <div></div>

                      <div>
                        <Popover
                          open={isPopoverOpen}
                          onOpenChange={setIsPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="bg-sky-200 w-full hover:bg-sky-300"
                            >
                              <Pyramid className="h-4 w-4 inline-block mr-2" />
                              Select Pattern
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[400px]"
                            side="right"
                            align="center"
                          >
                            {patterns.length === 0 ? (
                              // loading spinner
                              <div className="flex justify-center items-center h-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                              </div>
                            ) : (
                              <div className="grid grid-cols-12 gap-2">
                                {patterns.map((pattern) => (
                                  // card image
                                  <div
                                    key={pattern.id}
                                    onClick={() => {
                                      setSvg(pattern.svg);
                                      setIsPopoverOpen(false); // Close Popover
                                    }}
                                    className="col-span-3 px-2 cursor-pointer hover:opacity-80 border rounded-lg"
                                  >
                                    <div
                                      className="h-20 w-full flex justify-center items-center"
                                      dangerouslySetInnerHTML={{
                                        __html: pattern.svg.replace(
                                          /(width|height)=".*?"/g,
                                          'width="50px" height="50px"' // Further adjusted size to ensure it takes effect
                                        ),
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </PopoverContent>
                        </Popover>
                      </div>

                      {svg && (
                        <div className="mt-4 relative">
                          <span className="font-semibold">Preview</span>
                          <div className=" mt-2">
                            <Button
                              onClick={() => {
                                if (svg !== null) {
                                  setSvg(null);
                                  setBackgroundColorRGBA({
                                    r: 255,
                                    g: 255,
                                    b: 255,
                                    a: 1,
                                  });
                                  setForegroundColorRGBA({
                                    r: 0,
                                    g: 0,
                                    b: 0,
                                    a: 1,
                                  });
                                }
                              }}
                              variant={"ghost"}
                              className="absolute top-0 right-2 rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div
                              className="flex justify-center p-2"
                              dangerouslySetInnerHTML={{
                                __html: svg.replace(
                                  /(width|height)=".*?"/g,
                                  'width="100px" height="100px"' // Further adjusted size to ensure it takes effect
                                ),
                              }}
                            />
                          </div>

                          <div className="flex flex-col gap-4 mt-4">
                            <div className="flex flex-col gap-2">
                              <Label>foreground color</Label>
                              {/* Color picker and RGBA value */}
                              <div className="flex gap-2 items-center">
                                {/* Color preview box */}
                                {/* <Popover>
                                  <PopoverTrigger asChild>
                                    <div
                                      style={{
                                        minWidth: 32,
                                        minHeight: 32,
                                        borderRadius: 6,
                                        border: "1px solid #ccc",
                                        background: `rgba(${foregroundColorRGBA.r},${foregroundColorRGBA.g},${foregroundColorRGBA.b},${foregroundColorRGBA.a})`,
                                        boxShadow: "0 0 2px #aaa",
                                      }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto ml-5 mt-2"
                                    side="bottom"
                                  >
                                    <RgbaColorPicker
                                      color={foregroundColorRGBA}
                                      onChange={setForegroundColorRGBA}
                                    />
                                  </PopoverContent>
                                </Popover> */}

                                <div
                                  style={{
                                    minWidth: 32,
                                    minHeight: 32,
                                    borderRadius: 6,
                                    border: "1px solid #ccc",
                                    background: `rgba(${foregroundColorRGBA.r},${foregroundColorRGBA.g},${foregroundColorRGBA.b},${foregroundColorRGBA.a})`,
                                    boxShadow: "0 0 2px #aaa",
                                  }}
                                />
                                {/* RGBA value display */}
                                <Input
                                  value={foregroundColor}
                                  readOnly
                                  className="w-[calc(100%-40px)] font-mono"
                                />
                                {/* Clear button */}
                                <Button
                                  variant="outline"
                                  onClick={() => clearColors('foreground')}
                                  className="ml-2"
                                >
                                  Clear
                                </Button>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Label>background color</Label>
                              {/* Color picker and RGBA value */}
                              <div className="flex gap-2 items-center">
                                {/* Color preview box */}
                                {/* <Popover>
                                  <PopoverTrigger asChild>
                                    <div
                                      style={{
                                        minWidth: 32,
                                        minHeight: 32,
                                        borderRadius: 6,
                                        border: "1px solid #ccc",
                                        background: `rgba(${backgroundColorRGBA.r},${backgroundColorRGBA.g},${backgroundColorRGBA.b},${backgroundColorRGBA.a})`,
                                        boxShadow: "0 0 2px #aaa",
                                      }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto ml-5 mt-2"
                                    side="bottom"
                                  >
                                    <RgbaColorPicker
                                      color={backgroundColorRGBA}
                                      onChange={setBackgroundColorRGBA}
                                      aria-disabled={true}
                                    />
                                  </PopoverContent>
                                </Popover> */}
                                <div
                                  style={{
                                    minWidth: 32,
                                    minHeight: 32,
                                    borderRadius: 6,
                                    border: "1px solid #ccc",
                                    background: `rgba(${backgroundColorRGBA.r},${backgroundColorRGBA.g},${backgroundColorRGBA.b},${backgroundColorRGBA.a})`,
                                    boxShadow: "0 0 2px #aaa",
                                  }}
                                />
                                {/* RGBA value display */}
                                <Input
                                  value={backgroundColor}
                                  readOnly
                                  className="w-[calc(100%-40px)] font-mono"
                                />
                                {/* Clear button */}
                                <Button
                                  variant="outline"
                                  onClick={() => clearColors('background')}
                                  className="ml-2"
                                >
                                  Clear
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Button onClick={handleExport} className=" w-full">
                  Export
                </Button>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel className=" border shadow shadow-violet-300">
                <div className="relative h-full">
                  {/* code block */}
                  <div
                    className="
                relative
                h-full hljs
                bg-[radial-gradient(circle,_#d0d4d9_1px,_#F9FAFB_1px)]
                [background-size:20px_20px]
                overflow-hidden p-16 select-none"
                    style={{
                      cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                  >
                    {svg && (
                      <div
                        className="h-full w-[calc(100% - 20%)] bg-white p-5 shadow rounded-2xl"
                        style={{
                          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                          transformOrigin: "center center",
                          transition: isDragging
                            ? "none"
                            : "transform 0.2s ease",
                        }}
                      >
                        <SvgComponents
                          svg={svg}
                          foregroundColor={foregroundColorRGBA}
                          backgroundColor={backgroundColorRGBA}
                        />
                      </div>
                    )}
                  </div>

                  {/* zoom buttons */}
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <Button
                      onClick={handleZoomIn}
                      className="shadow"
                      variant="secondary"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleZoomOut}
                      className="shadow"
                      variant="secondary"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => {
                        setScale(1);
                        setPosition({ x: 0, y: 0 });
                      }}
                      className="shadow"
                      variant="secondary"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </main>
    </div>
  );
}
