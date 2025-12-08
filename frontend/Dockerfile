# ---- Builder Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build Next.js standalone
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine
WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy standalone server and dependencies from builder
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./        
COPY --from=builder /app/node_modules ./      

ENV PORT=3000
EXPOSE 3000

# Start server with PM2
CMD ["pm2-runtime", "server.js"]
