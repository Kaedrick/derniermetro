FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY src ./src

ENV APP_PORT=5000
EXPOSE 5000

CMD ["node", "src/index.js"]
