// Container for all the environments
var environments = {};

// Staging (default) env
environments.staging = {
  port: 3000,
  envName: 'staging'
};

// Production (default) env
environments.production = {
  port: 5000,
  envName: 'production'
};
// Determine which enviornment was passed as command-line arg
var currentEnv =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Check that the current environment is one of the environments above, if not => default to staging
var envToExport =
  typeof environments[currentEnv] === 'object'
    ? environments[currentEnv]
    : environments.staging;

module.exports = envToExport;
