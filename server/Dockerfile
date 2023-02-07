FROM node:16
WORKDIR /buidlfy
COPY package*.json ./ tsconfig.json ./
COPY src ./src
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]