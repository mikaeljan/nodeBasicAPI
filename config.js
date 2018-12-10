// Initial container for envs
const envs = {};

// Development (default) env
envs.dev = {
  port: 3000,
  envName: 'dev'
};

// Production (default) env
envs.prod = {
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
  typeof envs[currentEnv] === 'object' ? envs[currentEnv] : envs.dev;

module.exports = envToExport;
