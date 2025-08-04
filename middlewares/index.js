const envConfig = require('../config');

const configMiddleware = (req, res, next) => {
  if (!envConfig) throw new Error('envConfig not found ');
  req.config = envConfig;
  next();
};

module.exports = configMiddleware;
