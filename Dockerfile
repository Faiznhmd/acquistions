# Base image
FROM node:18-alpine AS base
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

# Healthcheck (ensure /health route exists in your app)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => { process.exit(1) })"

# Production stage
FROM base AS production
CMD ["npm", "start"]

# Development stage (optional: use docker-compose.dev.yml with volumes)
FROM node:18-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
