// prisma/prisma.config.ts
import { defineConfig } from "prisma/config";

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL!, // Prisma จะอ่านค่า DB จากตรงนี้
    },
  },
});