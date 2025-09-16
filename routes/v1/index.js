const apiV1Router = require('express').Router();
const authGuard = require('../../middlewares/authGuard');
const authRoute = require('./auth.route');
const categoryRoute = require('./category.route');

/**
 * Register API v1 routes
 */
apiV1Router.use('/auth', authRoute);
apiV1Router.use('/category', authGuard, categoryRoute);

module.exports = apiV1Router;
