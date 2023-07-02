FROM node:18.16.0

COPY . /app
WORKDIR /app

RUN yarn global add pm2
RUN yarn install

RUN npx prisma generate
RUN yarn build
CMD ["pm2-runtime", "start", "yarn", "--", "start"]
