FROM node:14

WORKDIR /Trabalho-2

COPY package*json ./

RUN npm install

COPY . .

ENV PORT=8080