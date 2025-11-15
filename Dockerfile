FROM node:lts-buster
RUN git clone https://github.com/Thenukadilitha/Thenuka-MD/root/ikmalvin
WORKDIR /root/ikmalvin
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install --production

COPY . .

EXPOSE 8000

CMD ["node", "index.js"]
