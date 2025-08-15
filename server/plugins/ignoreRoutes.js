// middlewares/ignoreRequests.js

// Paths or regex patterns to skip
const ignorePatterns = [
  /^\/favicon\.ico$/,
  /^\/\.well-known\//,
  /^\/robots\.txt$/,
];

const ignoreRequests = (req, res, next) => {
  const path = req.path || req.url;
  if (ignorePatterns.some((pattern) => pattern.test(path))) {
    return res.status(404).end();
  }
  return next();
};

const useIgnoreRoutes = (app) => {
  app.use(ignoreRequests);
};
module.exports = useIgnoreRoutes;
