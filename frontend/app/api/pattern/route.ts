"use server";
import { PrismaClient } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import axios from "axios";
const prisma = new PrismaClient();


function convertSVGtoString(url: string, filePath: string): Promise<string> {
  return axios
    .get(url, { responseType: "arraybuffer" })
    .then((response) => {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(filePath, response.data);
      // อ่านไฟล์ SVG และแปลงเป็น string
      return fs.readFileSync(filePath, "utf-8");
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.error(`File not found at URL: ${url}`);
      } else {
        console.error(`Error downloading SVG from URL: ${url}`, error);
      }
      // Return an empty string or a default SVG as a fallback
      return "";
    });
}

export async function GET() {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
  try {
    const patterns = await prisma.pattern.findMany({
      select: {
        id: true,
        name: true,
        file_name: true,
        file_path: true,
      },
    });

    const patternsWithSVG = await Promise.all(
      patterns.map(async (pattern) => {
        const filePath = path.join(process.cwd(), pattern.file_path);
        const svg = await convertSVGtoString(
          `${adminUrl}/storage/${pattern.file_path}`,
          filePath
        );
        return {
          ...pattern,
          svg,
        };
      })
    );

    return NextResponse.json({
      patternsWithSVG,
    });
  } catch (error) {
    console.error("Error fetching patterns:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch patterns",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }
    // convert file to <svg>
    
    const svgContent = await file.text();
    return NextResponse.json({
      message: "Pattern created successfully",
      svg: svgContent, // ส่ง svg กลับไป
    });
  } catch (error) {
    console.error("Error creating pattern:", error);
    return NextResponse.json(
      {
        error: "Failed to create pattern",
      },
      { status: 500 }
    );
  }
}
