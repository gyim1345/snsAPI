FROM node:12

WORKDIR /snsAPI

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8383

ENTRYPOINT [ "npm", "start" ]
