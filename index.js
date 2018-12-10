// Initial imports
const config = require('./config');
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

// Create server
const server = http.createServer((req, res) => {
  //Get the request URL and parse it
  const parsedUrl = url.parse(req.url, true);
});

server.listen(config.port, () => {
  console.log(
    `The app is now listening on port ${config.port} in ${
      config.envName
    } environment.`
  );
});
