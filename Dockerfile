FROM node:12

WORKDIR /snsAPI

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1234

CMD [ "npm", "start" ]
