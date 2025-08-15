const { getStoreData } = require('../../services/store');

const logger = require('../../services/logger');

function requestLogger(req, res, next) {
  const startTime = Date.now();
  const context = getStoreData() || {};
  // Only add/override ip/method/path, keep existing correlationId/requestId
  const augmentedContext = {
    ...context,
    ip: req.ip,
    method: req.method,
    path: req.originalUrl || req.url,
    userId: (req.user && req.user.id) || undefined,
  };

  // Ensure X-Correlation-Id is returned to client (at earliest)
  if (augmentedContext.correlationId) {
    res.setHeader('X-Correlation-Id', augmentedContext.correlationId);
  }

  logger.info('REQUEST_START', augmentedContext);

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    // Always read latest context
    const finishedContext = {
      ...augmentedContext,
      statusCode: res.statusCode,
      durationMs,
    };
    logger.info('REQUEST_FINISH', finishedContext);
  });

  res.on('close', () => {
    if (!res.writableEnded) {
      const abortedContext = {
        ...augmentedContext,
        aborted: true,
      };
      logger.info('REQUEST_ABORTED', abortedContext);
    }
  });

  next();
}

const useRequestLogger = (app) => {
  app.use(requestLogger);
};

module.exports = useRequestLogger;
