const cookieParser = require('cookie-parser');

const useCookies = (app) => {
  app.use(cookieParser());
};

module.exports = useCookies;
