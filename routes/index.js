const commonRoutes = require('./common');

module.exports = (app) => {
  app.use('/app', commonRoutes);
};
