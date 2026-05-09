# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for Prisma/Alpine
RUN apk add --no-cache openssl

# Install dependencies (ignoring scripts to avoid prisma generate failure)
COPY package*.json ./
RUN npm install --ignore-scripts

# Copy source, generate prisma, and build
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Ensure openssl is available in runtime
RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
