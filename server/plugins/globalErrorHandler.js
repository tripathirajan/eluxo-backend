const AppError = require('../../utils/AppError');

const useGlobalErrorHandler = (app) => {
  console.log('initiating global error handler');
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'INTERNAL_SERVER_ERROR';
    const success = err.success || false;
    const details = err.details || null;

    const accept = req.headers.accept || '';

    if (accept.includes('text')) {
      res.status(`${statusCode}`).send(`${message}`);
    } else if (accept.includes('html')) {
      res.status(statusCode).send(
        `
                <h1> message ${message}</h1>
                <p>${success}</p>
                <p>${details}</p>
                `
      );
    } else {
      res.status(statusCode).json({
        success,
        message,
        details,
      });
    }
  });
};

module.exports = useGlobalErrorHandler;
