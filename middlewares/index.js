const envConfig = require('../config');

const configMiddleware = (req, res, next) => {
  req.config = envConfig;
  if (!envConfig) throw new Error('envConfig not found ');
  next();
};

module.exports = configMiddleware;
