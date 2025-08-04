const envConfig = require('../../config/env');

const useConfigReader = (app) =>
  app.use((req, res, next) => {
    if (!envConfig) throw new Error('envConfig not found ');
    req.config = envConfig;
    next();
  });

module.exports = useConfigReader;
