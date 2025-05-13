# Build stage
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM node:20-alpine as production

WORKDIR /app

# Install `serve` globally
RUN npm install -g serve

EXPOSE 3000

