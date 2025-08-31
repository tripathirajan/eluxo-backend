const commonRoutes = require('./common.route');
const apiV1Router = require('./v1');

module.exports = (app) => {
  app.use('/app', commonRoutes);
  app.use('/api/v1', apiV1Router);
};
