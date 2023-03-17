FROM node:18.14.2

MAINTAINER Antoine PRONNIER, <antoine.pronnier@gmail.com>

USER container
ENV USER container
ENV HOME /home/container

WORKDIR $HOME

RUN npm install -g @angular/cli

COPY . .

RUN npm ci
RUN build:ssr

CMD ["/bin/ash", "npm", "run", "serve:ssr"]
