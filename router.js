//Initial imports
const handlers = require('./handlers');
//Define the request router
let router = {
  sample: handlers.hello
};

module.exports = router;
