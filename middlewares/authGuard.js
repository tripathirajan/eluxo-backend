// middlewares/authGuard.js
const { ResponseError, AUTH, USER } = require('../errors');
const { verifyAccessToken } = require('../services/token.service');
const User = require('../models/user.model');

async function authGuard(req, res, next) {
  try {
    const hdr = req.headers.authorization;
    if (!hdr || !hdr.startsWith('Bearer ')) {
      return next(
        new ResponseError(
          AUTH.MISSING_AUTH_HEADER,
          'Authorization header missing',
          401
        )
      );
    }
    const token = hdr.slice(7);
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.sub || payload.userId).select(
      '-passwordHash'
    );
    if (!user || !user.isActive) {
      return next(
        new ResponseError(USER.NOT_FOUND, 'User not found or inactive', 401)
      );
    }
    req.user = user;
  } catch (err) {
    next(err);
  }
  return next();
}

module.exports = authGuard;
