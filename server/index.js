const express = require("express");
const loadEnv = require("./plugins/env");
const useCors = require("./plugins/cors");
const useCookies = require("./plugins/cookies");
const useErrorHandler = require("./plugins/error-handler");
const handleCrashes = require("./plugins/crash-handler");
const { connectToMongo } = require("./plugins/database");

module.exports.setupServer = function () {
  loadEnv();
  handleCrashes();
  connectToMongo();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  useCors(app);
  useCookies(app);

  return app;
};

module.exports.applyErrorHandlers = function (app) {
  useErrorHandler(app);
};
