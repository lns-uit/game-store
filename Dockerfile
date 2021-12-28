FROM node:14.18.0-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g serve

CMD serve -s build