const cookieParser = require("cookie-parser");

const useCookies = function (app) {
  app.use(cookieParser());
};

module.exports = useCookies;
