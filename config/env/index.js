process.env.DOTENV_LOG = 'false';

const dotenvFlow = require('dotenv-flow');

const envSchema = require('./schema');
const {
  prettyLogger: { showErrorMsg },
} = require('../../services/logger');

// Load env vars based on NODE_ENV
dotenvFlow.config({
  node_env: process.env.NODE_ENV || 'local',
  override: true,
  debug: process.env.NODE_ENV === 'local',
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  showErrorMsg('❌ Invalid environment configuration:');
  parsedEnv.error.errors.forEach((err) =>
    showErrorMsg(`- ${err.path.join('.')}: ${err.message}`)
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

module.exports = Object.freeze(parsedEnv.data);
