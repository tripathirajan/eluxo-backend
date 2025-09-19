const { logger } = require('../../services/logger');

module.exports = () => {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', {
      error: err.message,
      stack: err.stack,
    });
    /* eslint-disable no-process-exit */
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', {
      error: reason.message || 'Unknown Error',
      extra: {
        ...reason,
      },
    });
    /* eslint-disable no-process-exit */
    process.exit(1);
  });
};
