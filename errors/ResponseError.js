const AppError = require('./AppError');

/**
 * ResponseError is used for API responses with structured data.
 */
class ResponseError extends AppError {
  /**
   * @param {string} code - Custom error code for client handling.
   * @param {string} message - Human-readable error message.
   * @param {number} statusCode - HTTP status code.
   * @param {object} [details] - Additional error details for debugging.
   */
  constructor(code, message, statusCode = 400, details = null) {
    super(message, statusCode, code);
    this.details = details;
  }
}

module.exports = ResponseError;
