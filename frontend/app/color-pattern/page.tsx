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
import { ZoomOut, ZoomIn, RefreshCcw, X, Pyramid } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SvgComponents } from "./svg";
import axios from "axios";
interface Pattern {
  id: number;
  name: string;
  file_name: string;
  file_path: string;
  svg: string;
}
// import Overcast from "../assets/overcast.svg";
export default function Page() {
  const [scale, setScale] = useState(1);
  const [svg, setSvg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fileType, setFileType] = useState<"svg" | "image">("svg");
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to control Popover visibility

  useEffect(() => {
    getPattern();
  }, []);
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

  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          maxSize={30}
          minSize={20}
          defaultSize={20}
          className="mt-4 p-4 flex justify-start"
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
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <span className="font-semibold">File Format</span>
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
                </div>
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
                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
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
                        onClick={() => setSvg(null)}
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
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg no-underline hover:no-underline">
                <h3 className="font-semibold">Select Color</h3>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We offer worldwide shipping through trusted courier partners.
                  Standard delivery takes 3-5 business days, while express
                  shipping ensures delivery within 1-2 business days.
                </p>
                <p>
                  All orders are carefully packaged and fully insured. Track
                  your shipment in real-time through our dedicated tracking
                  portal.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className=" border shadow shadow-violet-300">
          <div className="relative h-full">
            {/* code block */}
            <div
              className="
                relative
                h-full hljs
                bg-[radial-gradient(circle,_#d0d4d9_1px,_#f5f3ff_1px)]
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
                    transition: isDragging ? "none" : "transform 0.2s ease",
                  }}
                >
                  <SvgComponents svg={svg} />
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
  );
}
