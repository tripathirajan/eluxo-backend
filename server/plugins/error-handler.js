const logger = require('../../services/logger');

const useErrorHandler = (app) => {
  app.use((err, req, res) => {
    logger.error('Global Error', {
      error: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
    });
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });
};

module.exports = useErrorHandler;
