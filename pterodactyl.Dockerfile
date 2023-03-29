FROM node:18.14.2 AS BUILD

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

RUN npm install -g @angular/cli

WORKDIR /container/build

COPY . .

RUN npm ci
RUN npm run build:ssr

FROM node:18.14.2 AS RUN

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

USER container
ENV USER=container HOME=/home/container
WORKDIR /home/container

COPY --from=BUILD /container/build/dist /home/www/dist
COPY --from=BUILD /container/build/package.json /home/www/package.json

COPY ./entrypointPteroq.sh /entrypoint.sh

CMD ["/bin/bash", "/entrypoint.sh"]
