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
