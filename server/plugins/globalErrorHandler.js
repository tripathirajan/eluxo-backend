const path = require('path');
const { getErrorPageDirPath } = require('../../utils/appPath');

const useGlobalErrorHandler = (app) => {
  app.use((err, req, res, next) => {
    const { message, statusCode, success, details } = err.toPlainObject();

    if (res.headerSent) {
      return next();
    }
    if (req.accept('json')) {
      if (typeof res.error === 'function') {
        return res.error();
      }
      return res.status(statusCode).json({
        success,
        message,
        details,
      });
    }
    if (req.accept('html')) {
      const errorPagePath = path.join(
        getErrorPageDirPath(),
        `${statusCode || 'unknown'}.html`
      );
      return res.status(statusCode).sendFile(errorPagePath);
    }
    return res.type('txt').send(message);
  });
};

module.exports = useGlobalErrorHandler;
