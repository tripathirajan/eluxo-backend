/* eslint-disable security/detect-object-injection */
const { httpCodeMapper, statusCodes } = require('../config/constant');

class AppError extends Error {
  /**
   * @param {Object} options
   * @param {string} options.code - Custom error code (e.g., ERR_INTERNAL_SERVER_ERROR)
   * @param {string} options.message - Error message
   * @param {boolean} [options.success=false] - Indicates if the operation was successful
   * @param {number} [options.statusCode=500] - HTTP status code
   * @param {any} [options.details] - Additional error details
   */
  constructor(message, code, extra = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = AppError.getStatusCode(code);
    this.success = AppError.isSuccess(code);
    this.details = extra;
    Error.captureStackTrace(this, this.constructor);
  }

  static getStatusCode(code) {
    // Map errorCode to statusCode
    return httpCodeMapper[code];
  }

  static isSuccess(code) {
    // Decide success based on errorCode
    return code === statusCodes.success;
  }

  toPlainObject() {
    return {
      code: this.code,
      message: this.message,
      success: this.success,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

module.exports = AppError;
