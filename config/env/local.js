module.exports = {
  app: {
    name: 'eluxo',
    port: process.env.PORT,
    description: 'backend api',
    env: 'local',
    secret: process.env.APP_SECRET,
  },

  db: {
    uri: process.env.DB_URI,
  },
  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:4200'],
    allowedCredentials: true,
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS
      ? process.env.CORS_ALLOWED_HEADERS.split(',')
      : ['Content-Type', 'Authorization', 'X-Requested-With'],
    allowedMethods: process.env.CORS_ALLOWED_METHODS
      ? process.env.CORS_ALLOWED_METHODS.split(',')
      : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  },
  helmet: {
    contentSecurityPolicy: false, // disabled for REST API
    dnsPrefetchControl: { allow: false },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'no-referrer' },
    crossOriginResourcePolicy: { policy: 'same-site' },
    crossOriginEmbedderPolicy: { policy: 'require-corp' },
  },
};
