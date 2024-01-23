FROM node:20 AS BUILD

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

RUN npm install -g @angular/cli

WORKDIR /container/build

COPY . .

RUN npm ci
RUN npm run build:ssr

FROM node:20 AS RUN

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

ENV USER=container HOME=/home/container
ENV PORT=80
WORKDIR /home/container

RUN mkdir dist
COPY --from=BUILD /container/build/dist dist
COPY --from=BUILD /container/build/package.json .

ENTRYPOINT ["npm", "run", "serve:ssr"]
