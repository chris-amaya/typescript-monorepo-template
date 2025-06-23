# Multi-stage build for API server
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml ./
COPY apps/api-server/package.json ./apps/api-server/
COPY packages/*/package.json ./packages/*/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN pnpm build --filter=@{{projectName}}/api-server

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiserver

# Copy built application
COPY --from=builder --chown=apiserver:nodejs /app/apps/api-server/dist ./dist
COPY --from=builder --chown=apiserver:nodejs /app/node_modules ./node_modules

USER apiserver

EXPOSE 3001

CMD ["node", "dist/index.js"]