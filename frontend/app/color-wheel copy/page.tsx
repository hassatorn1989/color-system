"use client";
import React, { useEffect } from "react";
import ColorWheelHarmony from "@/components/ColorWheel";
import axios from "axios";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
// import { TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const page = () => {
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

  function selectColor(groupColorId: string) {
    setLoading(true);
    if (groupColorId === "") {
      setBaseColor([
        "#FF0000", // Red
        "#FF7F00", // Orange
        "#FFFF00", // Yellow
        "#7FFF00", // Yellow-Green
        "#00FF00", // Green
        "#00FF7F", // Green-Cyan
        "#00FFFF", // Cyan
        "#007FFF", // Blue-Cyan
        "#0000FF", // Blue
        "#7F00FF", // Blue-Magenta
        "#FF00FF", // Magenta
        "#FF007F", // Red-Magenta
      ]);
      setGroupColorId("");
      setLoading(false);
    } else {
      axios
        .get(`/api/color/?groupColorId=${groupColorId}`)
        .then((response) => {
          setBaseColor(response.data.colors.map((color: Color) => color.color));
          setGroupColorId(groupColorId);
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
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              สำรวจสเปกตรัมสี
            </Badge>
            <br />
            <span className="text-5xl md:text-6xl font-bold  mb-4 leading-tight text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              วงจรสี
            </span>
            <p className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
              ทำความเข้าใจโครงสร้างพื้นฐานของความสัมพันธ์ของสีและวิธีที่สีโต้ตอบกันในวงจรสีแบบดั้งเดิม
            </p>
          </div>
          <div className="">
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-"></div>
              </div>
            ) : (
              <>
                {!loading && baseColor.length > 0 && (
                  <div className="mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                      {[
                        { key: "monochromatic", label: "สีเดี่ยว" },
                        { key: "complementary", label: "สีคู่ตรงข้าม" },
                        { key: "analogous", label: "สีข้างเคียง" },
                        { key: "triadic", label: "สีสามเหลี่ยม" },
                        {
                          key: "split-complementary",
                          label: "สีตรงกันข้ามเยื้อง",
                        },
                        { key: "tetradic", label: "สีสี่เหลี่ยมผืนผ้า" },
                        { key: "square", label: "สีสี่เหลี่ยมจัตุรัส" },
                      ].map((type) => (
                        <button
                          key={type.key}
                          className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                            harmonyType === type.key
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary/10 text-foreground hover:bg-secondary/20"
                          }`}
                          onClick={() => setHarmonyType(type.key)}
                        >
                          {type.label}
                          <br />
                          {type.key}
                        </button>
                      ))}

                      {/* <div className="col-span-2 md:col-span-1 lg:col-span-2">
                        <Select
                          value={groupColorId}
                          onValueChange={(value) => selectColor(value)}
                          className="w-full"
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Group Color" />
                          </SelectTrigger>
                          <SelectContent>
                            {groupColor.map((groupColor, index) => (
                              <SelectItem key={index} value={groupColor.id}>
                                {groupColor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div> */}
                    </div>
                    <ColorWheelHarmony
                      baseColor={baseColor}
                      onSendData={handleSendData}
                      harmonyType={harmonyType}
                      groupColor={groupColor}
                      groupColorId={groupColorId}
                      selectColor={selectColor}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
