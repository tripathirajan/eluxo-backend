module.exports = {
  app: {
    name: 'eluxo',
    port: process.env.PORT,
    description: '',
    env: 'staging',
    secret: process.env.APP_SECRET,
  },

  db: {
    uri: process.env.DB_URI,
  },
  cors: {
    allowedOrigins: [],
    allowedHeaders: [],
    allowedMethods: [],
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
