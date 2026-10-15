# 1) Build the Vite site
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Serve the built files on port 8080
FROM pierrezemb/gostatic
COPY --from=build /app/dist/ /srv/http/
# HTTPS redirect is handled by Fly (force_https in fly.toml)
CMD ["-port", "8080", "-enable-logging"]
