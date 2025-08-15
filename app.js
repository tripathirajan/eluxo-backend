const http = require('http');

const { setupServer, applyErrorHandlers } = require('./server');
const { consoleLogger } = require('./services/logger');
const notFound = require('./middlewares/notFound');
const routes = require('./routes');

const app = setupServer({
  postRouteMiddleware: (appInstance) => {
    // not found middleware
    appInstance.use(notFound);
  },
  routes,
});

const showAppBanner = ({ host, port }) => {
  consoleLogger.banner('Eluxo');
  consoleLogger.showInfo('🚀 Server running');
  consoleLogger.showInfo(`🖥️  Host: ${host === '::' ? 'localhost' : host}`);
  consoleLogger.showInfo(`🔌 Port: ${port}`);
  consoleLogger.showInfo(
    `💻 Environment: ${process.env.NODE_ENV || 'development'}`
  );
  consoleLogger.notice(`Press Ctrl+C to gracefully stop the server`);
};
/**
 * Server setup
 */
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  const host = typeof address === 'string' ? address : address.address;
  const port = typeof address === 'string' ? 0 : address.port;
  showAppBanner({ host, port });
});

applyErrorHandlers(app, server);
