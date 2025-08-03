// import all config;
const local = require('./local');
const stagging = require('./staging');
const production = require('./production');

// create a mapper
const envConfigMapper = {
  local,
  stagging,
  production,
};
const env = process.env.NODE_ENV || 'local';
const allowedEnvFiles = ['local', 'stagging', 'production'];
const readEnvConfig = () => {
  if (!allowedEnvFiles.includes(env)) throw new Error('Env not allowed!');
  // return env config file from mapper
  return envConfigMapper[env || 'local'];
};

module.exports = readEnvConfig();
