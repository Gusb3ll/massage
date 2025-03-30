FROM node:22-alpine AS base
ENV PNPM_HOME=/usr/bin
ENV TURBO_TELEMETRY_DISABLED=1

RUN apk add --no-cache openssl
RUN npm i -g pnpm@9.15.5

FROM base AS init
WORKDIR /app

COPY . .
RUN pnpm add -g turbo@2.4.4
RUN turbo prune --scope=@app/server --docker

FROM base AS installer
WORKDIR /app

COPY --from=init /app/out/json/ ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=installer /app ./
COPY --from=init /app/out/full/ ./
RUN pnpm turbo run build --filter=@app/server
RUN rm -rf ./node_modules
RUN pnpm install --frozen-lockfile --prod

FROM base as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server

COPY --from=builder --chown=server:nodejs /app /app
COPY ./.env ./.env

EXPOSE 4000
CMD ["pnpm", "dotenvx", "run", "--", "node", "./apps/server/dist/main"]