const cors = require('cors');
const { corsConfig } = require('../../config/appConfig');

/**
 * Get the list of allowed origins for CORS.
 * @returns {string[]} An array of allowed origin strings.
 */
const getOrigins = () => {
  const origins = corsConfig.origin;

  return origins === '*'
    ? ['*']
    : origins.split(',').map((origin) => origin.trim());
};

/**
 * Apply CORS middleware to the Express app.
 * @param {*} app - The Express app instance.
 */
function useCors(app) {
  const allowedOrigins = getOrigins();
  const allowedHeaders = corsConfig.allowedHeaders || [];
  const allowedMethods = corsConfig.methods || [];

  app.use(
    cors({
      origin: (origin, cb) =>
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*')
          ? cb(null, true)
          : cb(new Error('Not allowed by CORS')),
      credentials: corsConfig.credentials || true,
      allowedHeaders,
      methods: allowedMethods,
    })
  );
}

module.exports = useCors;
