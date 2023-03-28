FROM node:18.14.2

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

ENV HOME /home/container

WORKDIR $HOME

RUN npm install -g @angular/cli

COPY . .

RUN npm ci
RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
