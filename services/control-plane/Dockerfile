FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci --omit=dev || npm install --omit=dev
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]


