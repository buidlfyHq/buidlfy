FROM node:18
WORKDIR /buidlfy
COPY package*.json ./ tsconfig.json ./
COPY public ./public
COPY src ./src
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]