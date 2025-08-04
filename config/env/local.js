module.exports = {
  app: {
    name: 'eluxo',
    port: process.env.PORT,
    description: '',
    env: 'local',
    secret: process.env.APP_SERECT,
  },

  db: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    usr: process.env.DB_USR,
    pwd: process.env.DB_PWD,
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
