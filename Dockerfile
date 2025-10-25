# ---------- Base ----------
FROM node:22-alpine AS development

WORKDIR /app
COPY package.json ./
RUN if [ ! -f yarn.lock ]; then yarn install; fi
COPY . .

ENV CHOKIDAR_USEPOLLING=true

EXPOSE 5173
ENTRYPOINT sh -c "\
if [ ! -f yarn.lock ] || [ package.json -nt yarn.lock ]; then \
echo '🔄 Detected new or changed package.json, reinstalling deps...'; \
yarn install; \
fi && \
echo '✅ Starting Vite dev server with watcher...' && \
yarn dev --host 0.0.0.0 \
"

# ---------- Build ----------
FROM base AS build

ARG VITE_APP_NAME
ARG VITE_API_BASE_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN yarn install --frozen-lockfile
RUN yarn build

# ---------- Production ----------
FROM nginx:alpine AS production

# Install openssl to generate self-signed certificates
RUN apk add --no-cache openssl

# Generate SSL certs (valid for 365 days)
RUN mkdir -p /etc/ssl/private /etc/ssl/certs && \
    openssl req -x509 -nodes -days 365 \
      -subj "/C=US/ST=Local/L=Local/O=Development/CN=localhost" \
      -newkey rsa:2048 \
      -keyout /etc/ssl/private/selfsigned.key \
      -out /etc/ssl/certs/selfsigned.crt

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
