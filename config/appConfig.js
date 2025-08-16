const env = require('./env');

const dbConfig = {
  uri: process.env.NODE_ENV === 'test' ? env.TEST_DB_URI : env.DB_URI,
};

const helmetConfig = {
  contentSecurityPolicy: false, // disabled for REST API
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginResourcePolicy: { policy: 'same-site' },
  crossOriginEmbedderPolicy: { policy: 'require-corp' },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
};

const corsConfig = {
  origin: env.CORS_ALLOWED_ORIGINS || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Correlation-Id',
  ],
  credentials: true,
};

module.exports = {
  dbConfig,
  helmetConfig,
  corsConfig,
};
