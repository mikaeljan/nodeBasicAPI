// Initial imports
const config = require('./config');
const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const router = require('./router');
const StringDecoder = require('string_decoder').StringDecoder;

// Create server
const server = http.createServer((req, res) => {
  // Get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  // Getting the path and trimming it
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Getting the HTTP request method
  const httpMethod = req.method;

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;
  const reqHeaders = req.headers;

  // Get the Payload
  let stringDecoder = new StringDecoder('utf-8');
  // Get the stream into a one thing before we decide what to do with it -> buffer
  let buffer = '';
  req.on('data', data => {
    buffer += stringDecoder.write(data);
  });
  // End will always be called
  req.on('end', () => {
    buffer += stringDecoder.end();

    // Choose a handler this request goes to
    let chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the handler
    let data = {
      trimmedPath,
      queryStringObject,
      httpMethod,
      reqHeaders,
      payload: buffer
    };
    chosenHandler(data, (statusCode, payload) => {
      // Default statuscode or the one called back by the handler
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      // Default empty object or the one called back by the handler
      payload = typeof payload === 'object' ? payload : {};

      // Every payload is object, we need to convert it to string
      var payloadString = JSON.stringify(payload);
      // Return response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
});

// Make the server listen on a port and log out console.log
server.listen(config.port, () => {
  console.log(
    `The app is now listening on port ${config.port} in ${
      config.envName
    } environment.`
  );
});
