# BUILD STAGE
FROM node:18-alpine AS builder

WORKDIR /app

# ติดตั้ง pnpm
RUN npm install -g pnpm

# copy lockfile และ package.json ก่อน
COPY package.json pnpm-lock.yaml* ./

# ติดตั้ง dependencies
RUN pnpm install --frozen-lockfile

# copy source code
COPY . .

# build nextjs standalone
RUN pnpm run build
