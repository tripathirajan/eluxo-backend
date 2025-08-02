const logger = require('../../services/logger');

module.exports = () => {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    /* eslint-disable no-process-exit */
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    /* eslint-disable no-process-exit */
    process.exit(1);
  });
};
