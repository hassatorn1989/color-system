"use client";
import React, { useEffect } from "react";
import ColorWheelHarmony from "@/components/ColorWheel";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-6">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {[
                  { key: "monochromatic", label: "โมโนโครมาติก" },
                  { key: "analogous", label: "อนาลอกัส" },
                  { key: "complementary", label: "คอมพลีเมนทารี" },
                  { key: "split-complementary", label: "สปลิทคอมพลีเมนทารี" },
                  { key: "triadic", label: "ไตรแอดิก" },
                  { key: "tetradic", label: "เตตระดิก" },
                  { key: "square", label: "สแควร์" },
                ].map((type) => (
                  <button
                    key={type.key}
                    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                      harmonyType === type.key
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setHarmonyType(type.key)}
                  >
                    {type.label}
                  </button>
                ))}

                <div>
                  <Select value={groupColorId} onValueChange={(value) => selectColor(value)}>
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
                </div>
              </div>

              {!loading && baseColor.length > 0 && (
                <ColorWheelHarmony
                  baseColor={baseColor}
                  onSendData={handleSendData}
                  harmonyType={harmonyType}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
