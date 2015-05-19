# codepotpl
Codepot website

# Development

1. install dependencies: `npm install`,
2. install bower dependencies: `node_modules/.bin/bower install`,
3. build grunt: `node_modules/.bin/grunt`,
4. start grunt watcher: `node_modules/.bin/grunt watch`,
5. start the app: `CDPT_HOST="http://localhost:8080/" node index.js`.

# Staging/release builds
To build for staging/release environment just run docker:

- `docker build --tag codepotpl .` to build image,
- `docker run -it -p 8080:8080 -e CDPT_HOST="<HOST_HERE>" codepotpl` to run container with exposed port 8080.

