// Initial container for environments
const envs = {};

// Development (default) env
environments.staging = {
  port: 3000,
  envName: 'dev'
};

// Production (default) env
environments.production = {
  port: 6666,
  envName: 'prod'
};

// Determine which enviornment was passed as command-line arg, if any
var currentEnv =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Check that the current environment is one of the envs above, if not => default to dev
var envToExport =
  typeof environments[currentEnv] === 'object'
    ? environments[currentEnv]
    : environments.dev;

module.exports = envToExport;
