FROM node:18.14.2

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

RUN npm install -g @angular/cli

ENV HOME=/home/container
WORKDIR $HOME

COPY . .

RUN npm ci
RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
