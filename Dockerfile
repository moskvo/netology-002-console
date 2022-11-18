FROM node:18.12.1-alpine3.16

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./
RUN npm install
COPY src ./src/
COPY books ./books/

CMD [ "npm", "run", "server"]