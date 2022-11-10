# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

WORKDIR /app

COPY package*.json ./ tsconfig.json ./

COPY src ./src

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start"]
