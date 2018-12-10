// Initial imports
const handlers = require('./handlers');
// Define the request router
let router = {
  hello: handlers.hello
};

module.exports = router;
