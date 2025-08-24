const { ResponseError, AUTH } = require('../errors');

function roleGuard(...allowed) {
  return (req, res, next) => {
    if (!req.user)
      return next(new ResponseError(AUTH.UNAUTHORIZED, 'Unauthorized', 401));
    if (!allowed.includes(req.user.role))
      return next(new ResponseError(AUTH.FORBIDDEN, 'Forbidden', 403));
    return next();
  };
}

module.exports = roleGuard;
