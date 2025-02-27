FROM node:22 AS BUILD

WORKDIR /container/build

COPY . .

RUN npm install -g @angular/cli && npm ci && npm run build:prod

FROM node:22 AS RUN

ENV PORT=80

WORKDIR /home/container

RUN mkdir dist
COPY --from=BUILD /container/build/dist dist
COPY --from=BUILD /container/build/package.json .

ENTRYPOINT ["npm", "run", "prod"]
