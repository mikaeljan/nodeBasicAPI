// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');

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

    // Route the request to the handler specified in the router
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

    // Request is done, finished. We can send the response now.
    console.log(
      `Request received on path: ${trimmedPath} with HTTP method: ${httpMethod} and these query string params`,
      queryStringObject
    );
    console.log(`Headers received: `, reqHeaders);
    console.log(`And this payload: `, buffer);
  });
  // Send the response
});

server.listen(config.port, () => {
  console.log(
    `The app is now listening on port ${config.port} in ${
      config.envName
    } environment.`
  );
});
// ======================================================
//Define the handlers
const handlers = {};
// Sample handler
handlers.sample = (data, callback) => {
  //Callback a http status code, payload = object
  callback(200, { name: data.payload });
};
// Ping handler
handlers.ping = (data, callback) => {
  callback(200);
};
//Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};
//Define the request router
let router = {
  sample: handlers.sample
};
