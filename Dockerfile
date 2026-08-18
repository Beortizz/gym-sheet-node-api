FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
