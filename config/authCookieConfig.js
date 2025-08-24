const env = require('./env');
const coreUtils = require('../utils/core');

const isProd = process.env.NODE_ENV === 'production';

const authCookieConfig = {
  name: env.REFRESH_COOKIE_NAME || 'eluxo_rt',
  path: env.REFRESH_COOKIE_PATH || '/api/v1/auth/refresh',
  domain: env.COOKIE_DOMAIN || undefined,
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
  maxAge: coreUtils.parseDurationToMs(env.JWT_REFRESH_EXPIRY || '7d'),
};

module.exports = authCookieConfig;
