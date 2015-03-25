# codepotpl
Codepot website

# Development

1. install dependencies: `npm install`,
2. install bower dependencies: `bower install`,
3. build grunt: `grunt`,
4. start grunt watcher: `grunt watch`,
5. start the app: `node index.js`.

# Staging/release builds
To build for staging/release environment just run docker:

- `docker build --tag codepotpl .` to build image,
- `docker run -it -p 8080:8080 codepotpl` to run container with exposed port 8080.

## Known issues:

- long time building due to lack of node_modules/bower_components caching,
- (development) big image sizes due to missing node_modules/bower_components/public in `.dockerignore`.