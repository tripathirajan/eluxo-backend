const { getStoreData } = require('../../services/store');

const { logger } = require('../../services/logger');

function requestLogger(req, res, next) {
  const startTime = Date.now();
  const context = getStoreData() || {};
  const reqData = logger.serializeRequest(req);
  // Only add/override ip/method/path, keep existing correlationId/requestId
  const augmentedContext = {
    ...reqData,
    ...context,
    userId: (req.user && req.user.id) || undefined,
  };

  // Ensure X-Correlation-Id is returned to client (at earliest)
  if (augmentedContext.correlationId) {
    res.setHeader('X-Correlation-Id', augmentedContext.correlationId);
  }
  if (augmentedContext.requestId) {
    res.setHeader('X-Request-Id', augmentedContext.requestId);
  }
  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    const resData = logger.serializeResponse(res);
    // Always read latest context
    const finishedContext = {
      ...resData,
      ...augmentedContext,
      durationMs,
    };
    logger.info('incoming_request_finished', finishedContext);
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
