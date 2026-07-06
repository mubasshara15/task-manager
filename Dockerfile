FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production
# Neon's serverless driver talks to its HTTP endpoint via fetch; some
# container network setups (notably Docker Desktop/WSL2) hand back an
# unreachable IPv6 address before falling back to IPv4, which fetch surfaces
# as a generic "TypeError: fetch failed". Preferring IPv4 avoids that path.
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

EXPOSE 3000

CMD ["npm", "start"]
