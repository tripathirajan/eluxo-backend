const { statusCodes } = require('../../config/constant');
const logger = require('../../services/logger');
const AppError = require('../../utils/AppError');

const useResponseFormatter = (app) => {
  app.use((req, res, next) => {
    try {
      res.success = (data) => {
        return res.status(200).json({
          ...data,
        });
      };
      res.error = (err) => {
        let httpStatusCode = 500;
        let payload = {
          code: statusCodes.internalServerError,
          success: false,
          mesage: 'Internal server error',
        };
        if (err instanceof AppError) {
          const { statusCode, rest } = err.toPlainObject();
          httpStatusCode = statusCode;
          payload = {
            ...payload,
            ...rest,
          };
        }
        return res.status(httpStatusCode).json(payload);
      };
    } catch (error) {
      logger.error(error.message);
    }
    next();
  });
};

module.exports = useResponseFormatter;
