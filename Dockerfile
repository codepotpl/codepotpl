FROM node:0.12.1-slim

ADD . /app
WORKDIR /app
RUN ["npm", "install", "-g", "--verbose"]
# bower and grunt paths added to main path, so we can call simply "bower"/"grunt" commands
ENV PATH /app/node_modules/bower/bin:$PATH
ENV PATH /app/node_modules/grunt-cli/bin:$PATH
#RUN ["npm", "run", "build-dist"]

EXPOSE 8080

CMD ["node", "index.js"]

