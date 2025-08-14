const express = require('express');
const loadEnv = require('./plugins/env');
// it should load before any import
loadEnv();

const useCors = require('./plugins/cors');
const useCookies = require('./plugins/cookies');
const useErrorHandler = require('./plugins/error-handler');
const handleCrashes = require('./plugins/crash-handler');
const { connectToMongo, closeConnection } = require('./plugins/database');
const useHelmet = require('./plugins/security');
const useSanitizer = require('./plugins/sanitizer');
const useConfigReader = require('./plugins/configReader');
const useAppContext = require('./plugins/appContext');
const {
  prettyLogger: { showMsg },
} = require('../services/logger');

module.exports.setupServer = ({
  routes,
  customMiddlewares,
  postRouteMiddleware,
}) => {
  const app = express();
  useConfigReader(app);
  connectToMongo();
  useHelmet(app);
  useSanitizer(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  useCors(app);
  useCookies(app);
  useAppContext(app);
  if (typeof customMiddlewares === 'function') customMiddlewares(app);

  if (typeof routes === 'function') routes(app);

  if (typeof postRouteMiddleware === 'function') postRouteMiddleware(app);

  useErrorHandler(app);

  return app;
};

module.exports.applyErrorHandlers = (app, server) => {
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
