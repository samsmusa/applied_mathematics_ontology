FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY next.config.js ./next.config.js
COPY .eslintrc.json ./.eslintrc.json
COPY tsconfig.json ./tsconfig.json

COPY public ./public
COPY src ./src

CMD ["yarn", "dev"]
