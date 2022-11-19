FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn prisma migrate deploy
RUN yarn prisma generate
RUN yarn vite build

# install pg_dump, needed for bin/sync_dev,
# which overrides local db data with data from the vercel instance
RUN apk add --no-cache postgresql-client 

CMD [ "yarn", "start" ]