FROM node:12.20

WORKDIR /usr/app

COPY  ./server/package*.json ./server/
COPY ./app/build ./build/

WORKDIR /usr/app/server
RUN npm install

COPY ./server .

RUN npm run build

CMD ["npm" ,"run" ,"start"]