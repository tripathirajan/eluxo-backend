const getConfig = require('../../config/env');

const useConfigReader = (app) =>
  app.use((req, res, next) => {
    const envConfig = getConfig();
    if (!envConfig) throw new Error('envConfig not found ');
    req.config = envConfig;
    next();
  });

module.exports = useConfigReader;
