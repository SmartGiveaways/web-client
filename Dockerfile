FROM node:apline

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . /usr/src

RUN yarn install

RUN apk update \
  apk add --no-cache --update curl ca-certificates openssl git tar bash sqlite fontconfig \
  && adduser -D -h /home/container container

USER container
ENV  USER=container HOME=/home/container

WORKDIR /home/container

COPY ./entrypoint.sh /entrypoint.sh

CMD ["/bin/bash", "entrypoint.sh"]