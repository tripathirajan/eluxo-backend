// package imports
const express = require('express');

// custom module imports
const {
  prettyLogger: { showMsg },
} = require('../services/logger');

// custom plugins
const useCors = require('./plugins/cors');
const useCookies = require('./plugins/cookies');
const useErrorHandler = require('./plugins/error-handler');
const handleCrashes = require('./plugins/crash-handler');
const { connectToMongo, closeConnection } = require('./plugins/database');
const useHelmet = require('./plugins/security');
const useSanitizer = require('./plugins/sanitizer');
const useAppContext = require('./plugins/appContext');
const useStaticAssets = require('./plugins/staticAssets');
const useRequestLogger = require('./plugins/request-logger');
const useIgnoreRoutes = require('./plugins/ignoreRoutes');

module.exports.setupServer = ({
  routes,
  customMiddlewares,
  postRouteMiddleware,
}) => {
  const app = express();
  connectToMongo();
  useHelmet(app);
  useSanitizer(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  useIgnoreRoutes(app);
  useStaticAssets(app);
  useCors(app);
  useCookies(app);
  useRequestLogger(app);
  useAppContext(app);

  if (typeof customMiddlewares === 'function') customMiddlewares(app);

  if (typeof routes === 'function') routes(app);

  if (typeof postRouteMiddleware === 'function') postRouteMiddleware(app);

  return app;
};

module.exports.applyErrorHandlers = (app, server) => {
  useErrorHandler(app);
  handleCrashes();

  process.on('SIGINT', async () => {
    await closeConnection();
    server.close(() => {
      showMsg('Server has been shut down gracefully');
      // eslint-disable-next-line no-process-exit
      process.exit(0);
    });
  });
};
