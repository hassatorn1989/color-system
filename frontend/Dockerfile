# ---- Deps ----
FROM node:20-slim AS deps
WORKDIR /app

# ติดตั้ง mysql client และ dependencies
RUN apt-get update && apt-get install -y default-mysql-client openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# คัดลอกไฟล์ package
COPY package.json ./

# ติดตั้ง dependencies ด้วย npm
RUN npm install --legacy-peer-deps

# ---- Builder ----
FROM node:20-slim AS builder
WORKDIR /app

# ติดตั้ง dependencies ที่จำเป็น
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# คัดลอก node_modules จาก stage deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# generate Prisma client
RUN npx prisma generate

# build Next.js
RUN npm run build

# ---- Runner ----
FROM node:20-slim AS runner
WORKDIR /app

# ติดตั้ง runtime dependencies
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

RUN npm install -g pm2

# คัดลอกไฟล์จาก stage builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["pm2-runtime", "server.js"]
