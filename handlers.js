// Define the handlers
const handlers = {};
// Sample handler
handlers.hello = (data, callback) => {
  //Callback a http status code, payload = object
  callback(200, { greeting: 'Welcome to our Dev Node.js API app.' });
};
//Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers;
