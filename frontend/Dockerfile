FROM node:20.3.0-alpine

WORKDIR /app/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
