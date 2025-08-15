const AppError = require('../../errors/AppError');
const logger = require('../../services/logger');
const errorRegistry = require('../../errors/errorRegistry');

const useErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    const isOperational = err instanceof AppError && err.isOperational;
    logger.error(err.name || 'Application_error', {
      error: err.message,
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      query: req.query,
      params: req.params,
      code: err.code || errorRegistry.GENERAL.INTERNAL_ERROR,
      ...(err.stack &&
        process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });

    if (isOperational) {
      // ✅ Safe to send to client
      return res.status(err.statusCode).json({
        success: false,
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
      });
    }
    return res.status(500).json({
      success: false,
      code: errorRegistry.GENERAL.INTERNAL_ERROR,
      message: 'Something went wrong.', // Generic, no stack trace
    });
  });
};

module.exports = useErrorHandler;
