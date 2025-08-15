const { getStoreData, setStore } = require('./appContext');
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
  };
  setStore(augmentedContext);

  // Ensure X-Request-Id is returned to client (at earliest)
  if (augmentedContext.requestId) {
    res.setHeader('X-Request-Id', augmentedContext.requestId);
  }

  logger.info('request:start', getStoreData());

  res.on('finish', () => {
    const durationMs = Date.now() - startTime;
    // Always read latest context
    const finishedContext = {
      ...getStoreData(),
      statusCode: res.statusCode,
      durationMs,
    };
    logger.info('request:finish', finishedContext);
  });

  res.on('close', () => {
    if (!res.writableEnded) {
      const abortedContext = {
        ...getStoreData(),
        aborted: true,
      };
      logger.info('request:aborted', abortedContext);
    }
  });

  next();
}

const useRequestLogger = (app) => {
  app.use(requestLogger);
};

module.exports = useRequestLogger;
