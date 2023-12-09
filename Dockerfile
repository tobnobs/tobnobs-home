# docker/dev.Dockerfile
FROM oven/bun:latest

WORKDIR /app/next-app

COPY package.json ./
COPY bun.lockb ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN bun install

COPY . .

RUN bun run build
CMD bun run start
