# Use a Node.js Alpine base image
FROM alpine:latest


RUN apk update 
RUN apk add --no-cache ffmpeg
RUN apk add --no-cache nodejs npm
RUN npm install --global pnpm


WORKDIR /home
COPY package*.json .
RUN pnpm install

COPY . .
#put your mongodb url
ENV MONGO_CONNECTION_URL=put-your-mondodb-url-here
ENV REFRESH_TOKEN_EXPIRY=7d
ENV ACCESS_TOKEN_EXPITY=3h
#dummy secrets
ENV REFRESH_TOKEN_SECRET=acc88ea9746a9908bb736174aa7dbe7955f24b0c13ec48d38dbcfa80331112b0 #
ENV ACCESS_TOKEN_SECRET=1c3b8f0d4a2e4b5c9f6e7d8e9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm","run","build"]