FROM node:0.12.1-slim

RUN ["apt-get", "update", "--fix-missing"]
RUN ["apt-get", "install", "git", "-y"]
RUN ["apt-get", "install", "imagemagick", "-y"]
RUN ["npm", "install", "-g", "bower", "grunt-cli"]

ADD package.json /app/package.json
WORKDIR /app
RUN ["npm", "install"]

ADD bower.json /app/bower.json
RUN ["bower", "install", "--allow-root"]

ADD . /app
RUN ["npm", "run", "build-dist"]

EXPOSE 8080

CMD ["node", "index.js"]

