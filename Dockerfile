FROM node:14

WORKDIR /usr/src/app/my-app

COPY package*.json ./

RUN npm install

EXPOSE 8081

CMD ["npm","run","serve"]
