const cors = require('cors');
const getConfig = require('../../config/env');

const { cors: corsConfig } = getConfig();

function useCors(app) {
  const allowedOrigins = corsConfig.allowedOrigins || [];
  const allowedHeaders = corsConfig.allowedHeaders || [];
  const allowedMethods = corsConfig.allowedMethods || [];

  app.use(
    cors({
      origin: (origin, cb) =>
        !origin || allowedOrigins.includes(origin)
          ? cb(null, true)
          : cb(new Error('Not allowed by CORS')),
      credentials: corsConfig.allowedCredentials || true,
      allowedHeaders,
      methods: allowedMethods,
    })
  );
}

module.exports = useCors;
