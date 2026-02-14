"use client";

// import Navigation from "@/components/navigation"
// import Footer from "@/components/footer"
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { use, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/dist/client/link";

export default function AboutPage() {
  const [wovenColors, setWovenColors] = useState([]);

  useEffect(() => {
    document.title = "สีผ้าทอ / Woven Colors - Sipator";
    getWovenColors();
  }, []);

  async function getWovenColors() {
    await axios
      .get("/api/woven-colors")
      .then((response) => {
        console.log(response.data.wovenColors);
        setWovenColors(response.data.wovenColors);
      })
      .catch((error) => {
        console.error("There was an error fetching the woven colors!", error);
      });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <Navigation /> */}

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              สีผ้าทอ
            </Badge>
            <br />
            <span className="text-5xl md:text-6xl font-bold  mb-4 leading-tight text-balance bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ทำความเข้าใจทฤษฎีสี
            </span>
          </div>
        </div>
      </main>
      <div className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 mb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wovenColors.map((color: { id: number; name: string }) => (
          <Link href={`/woven-colors/${color.id}`} key={color.id}>
            <Card key={color.id} className="p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">{color.name}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
