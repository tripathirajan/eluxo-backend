process.env.DOTENV_LOG = 'false';

const dotenvFlow = require('dotenv-flow');

const envSchema = require('./schema');
const consoleLogger = require('../../services/logger/consoleLogger');

const getEnvData = () => {
  // Load env vars based on NODE_ENV
  dotenvFlow.config({
    node_env: process.env.NODE_ENV || 'local',
    override: true,
    debug: process.env.NODE_ENV === 'local',
  });

  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    consoleLogger.showError('❌ Invalid environment configuration:');
    parsedEnv.error.issues.forEach((err) =>
      consoleLogger.showError(`- ${err.path.join('.')}: ${err.message}`)
    );
    throw new Error('Invalid environment configuration');
  }
  return parsedEnv.data;
};
const processEnv = getEnvData();
module.exports = Object.freeze(processEnv);
