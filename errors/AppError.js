/**
 * Base application error class.
 * Used for all operational errors in the app.
 */
class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message.
   * @param {number} statusCode - HTTP status code.
   * @param {string} code - Custom application error code.
   * @param {boolean} isOperational - Whether the error is operational.
   */
  constructor(
    message,
    statusCode = 500,
    code = 'APP_ERROR',
    isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name; // Set the error name to the class name
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
