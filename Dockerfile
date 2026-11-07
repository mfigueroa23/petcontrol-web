# syntax=docker/dockerfile:1

# Etapa 1: compila la aplicación Angular con pnpm.
FROM node:26-alpine AS build
WORKDIR /app

RUN npm install --global pnpm@12.16.1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# Etapa 2: Nginx sirve los archivos estáticos sin privilegios de root (SDD 5.5).
FROM nginxinc/nginx-unprivileged:1.30-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/web/browser /usr/share/nginx/html

EXPOSE 8080
