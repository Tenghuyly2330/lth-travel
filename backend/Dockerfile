FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma generate

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "run", "dev"]
