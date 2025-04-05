# -------------------------
# Base Stage (dependencies)
# -------------------------
FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# -------------------------
# Build Stage
# -------------------------
FROM base AS build

RUN npm run build

# -------------------------
# Production Stage
# -------------------------
FROM node:18-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/.env ./

USER node

EXPOSE 80
CMD ["node", "dist/main"]
