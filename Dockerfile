FROM node:0.12.1-slim

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "git", "-y"]
RUN ["npm", "install", "-g", "--verbose", "bower", "grunt-cli"]

ADD package.json /app/package.json
WORKDIR /app
RUN ["npm", "install", "--verbose"]

ADD . /app
RUN ["npm", "run", "build-dist"]

EXPOSE 8080

CMD ["node", "index.js"]

