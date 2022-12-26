FROM node:18-alpine3.16

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn prisma migrate deploy
RUN yarn prisma generate
RUN yarn vite build

CMD [ "yarn", "start" ]