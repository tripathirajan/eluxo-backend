const errorRegistry = require('../errors/errorRegistry');
const ResponseError = require('../errors/ResponseError');

const notFound = (req, res, next) => {
  if (!res.headersSent) {
    next(
      new ResponseError(
        errorRegistry.GENERAL.NOT_FOUND,
        'Resource not found',
        404
      )
    );
  } else {
    next();
  }
};

module.exports = notFound;
