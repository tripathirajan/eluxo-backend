/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// import config based on env

const env = process.env.NODE_ENV || 'local';
const allowedEnvFiles = ['local', 'staging', 'production'];

const readEnvConfig = () => {
  if (!allowedEnvFiles.includes(env)) throw new Error('Env not allowed!');
  // Dynamically require only the needed config file
  return require(`./${env}`);
};

const getConfig = () => readEnvConfig();

module.exports = getConfig;
