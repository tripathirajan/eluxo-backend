const http = require('http');

const { setupServer, applyErrorHandlers } = require('./server');
const logger = require('./services/logger');
const notFound = require('./middlewares/notFound');

const app = setupServer({
  postRouteMiddleware: (appInstance) => {
    // not found middleware
    appInstance.use(notFound);
  },
});

/**
 * Server setup
 */
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  const host = typeof address === 'string' ? address : address.address;
  const port = typeof address === 'string' ? 0 : address.port;
  logger.info(`Server is running at http://${host}:${port}`);
  logger.info(`Press Ctrl+C to stop the server`);
});
// setup routes here
// gracefully handle shutdown
process.on('SIGINT', () => {
  logger.info('Shutting down server...');
  server.close(() => {
    logger.info('Server has been shut down gracefully.');
    /* eslint-disable no-process-exit */
    process.exit(0);
  });
});

applyErrorHandlers(app);
