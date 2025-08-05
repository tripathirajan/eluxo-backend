const express = require('express');
const loadEnv = require('./plugins/env');
const useCors = require('./plugins/cors');
const useCookies = require('./plugins/cookies');
const useErrorHandler = require('./plugins/error-handler');
const handleCrashes = require('./plugins/crash-handler');
const { connectToMongo } = require('./plugins/database');
const useHelmet = require('./plugins/security');
const useSanitizer = require('./plugins/sanitizer');
const useConfigReader = require('./plugins/configReader');
const useResponseFormatter = require('./plugins/responseFormatter');

module.exports.setupServer = ({
  routes,
  customMiddlewares,
  postRouteMiddleware,
}) => {
  loadEnv();

  const app = express();
  useConfigReader(app);
  connectToMongo();
  useHelmet(app);
  useSanitizer(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  useCors(app);
  useCookies(app);
  useResponseFormatter(app);
  if (typeof customMiddlewares === 'function') customMiddlewares(app);

  if (typeof routes === 'function') routes(app);

  if (typeof postRouteMiddleware === 'function') postRouteMiddleware(app);

  handleCrashes();

  return app;
};

module.exports.applyErrorHandlers = (app) => {
  useErrorHandler(app);
};
