/* eslint-disable no-process-exit */
process.env.DOTENV_LOG = 'false';
const dotenv = require('dotenv-flow');
const { z } = require('zod');
const {
  prettyLogger: { showErrorMsg },
} = require('../../services/logger');

const envSchema = z.object({
  NODE_ENV: z.enum(['local', 'production', 'staging']).default('local'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default('3300'),
  DB_URI: z.string().refine((val) => /^mongodb(?:\+srv)?:\/\/.+/.test(val), {
    message: 'DB_URI must be a valid MongoDB connection string.',
  }),
  APP_SECRET: z
    .string()
    .min(32, 'APP_SECRET must be at least 32 characters long.'),
  CORS_ALLOWED_ORIGINS: z.string(),
  CORS_ALLOWED_HEADERS: z
    .string()
    .default('Content-Type,Authorization,X-Requested-With'),
  CORS_ALLOWED_METHODS: z.string().default('GET,POST,PUT,DELETE,OPTIONS'),
});

module.exports = () => {
  dotenv.config({
    override: true,
    debug: process.env.NODE_ENV === 'local',
  });
  const parsedEnv = envSchema.safeParse(process.env);
  if (!parsedEnv.success) {
    showErrorMsg('Invalid environment configuration');
    process.exit(1);
  }
};
