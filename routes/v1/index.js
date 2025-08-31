const apiV1Router = require('express').Router();
const authRoute = require('./auth.route');

/**
 * Register API v1 routes
 */
apiV1Router.use('/auth', authRoute);

module.exports = apiV1Router;
