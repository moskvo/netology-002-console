FROM node:18.12.1-alpine3.16

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./
RUN npm install
COPY counter.js ./

CMD [ "node", "counter.js"]