# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Build Next.js (standalone)
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine
WORKDIR /app

# Copy standalone output + static + public folders
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose Next.js default port
EXPOSE 3000

# Run the standalone server
CMD ["node", "server.js"]