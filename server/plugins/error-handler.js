const logger = require('../../services/logger');

const useErrorHandler = (app) => {
  app.use((err, req, res) => {
    logger.error('Global Error:', err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });
};

module.exports = useErrorHandler;
