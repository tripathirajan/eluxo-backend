const AppError = require('./AppError');
const ResponseError = require('./ResponseError');
const errorRegistry = require('./errorRegistry');

module.exports = {
  AppError,
  ResponseError,
  ...errorRegistry,
};
