FROM node:22-bookworm-slim

WORKDIR /app

# Install OpenSSL
RUN apt-get update -y && \
    apt-get install -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]