const getEnv = require('./env');

const dbConfig = {
  uri:
    process.env.NODE_ENV === 'test' ? getEnv('TEST_DB_URI') : getEnv('DB_URI'),
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
  origin: getEnv('CORS_ALLOWED_ORIGINS') || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Correlation-Id',
  ],
  credentials: true,
};

const cloudinaryConfig = {
  cloud_name: getEnv('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnv('CLOUDINARY_API_KEY'),
  api_secret: getEnv('CLOUDINARY_API_SECRET'),
};

const uploadConfig = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
};

module.exports = {
  dbConfig,
  helmetConfig,
  corsConfig,
  cloudinaryConfig,
  uploadConfig,
};
