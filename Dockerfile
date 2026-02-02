FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Copy dependencies first for better caching
COPY bun.lock package.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy rest of the app
COPY . .

# Build the Next.js app
RUN bun run build

FROM oven/bun:1 AS runner

WORKDIR /app

# Copy only what’s needed for runtime
COPY --from=builder /app/package.json /app/bun.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production deps
RUN bun install --production --frozen-lockfile

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production

# Start the app
CMD ["bun", "run", "start"]
