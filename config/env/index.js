process.env.DOTENV_LOG = 'false';

const dotenvFlow = require('dotenv-flow');

const envSchema = require('./schema');
const consoleLogger = require('../../services/logger/consoleLogger');

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
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

module.exports = Object.freeze(parsedEnv.data);
