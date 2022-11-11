FROM node:18.12.1-alpine3.16

WORKDIR /app

COPY src/package*.json ./
RUN npm install
COPY src/ ./

CMD [ "node", "library.js"]