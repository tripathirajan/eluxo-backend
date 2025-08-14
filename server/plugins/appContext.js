const { v4: uuidv4 } = require('uuid');
const { runWithStore } = require('../../services/store');

const appContext = (req, res, next) => {
  runWithStore(() => next(), {
    correlationId: req.headers['x-correlation-id'] || uuidv4(),
    requestId: uuidv4(),
  });
};

const useAppContext = (app) => {
  app.use(appContext);
};
module.exports = useAppContext;
