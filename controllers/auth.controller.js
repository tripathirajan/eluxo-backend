/* eslint-disable no-underscore-dangle */

const cryptoUtils = require('../utils/crypto');

const User = require('../models/user.model');
const {
  generateAccessToken,
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
  listActiveSessions,
} = require('../services/token.service');
const { authCookieConfig } = require('../config/authCookieConfig');
const { ResponseError, USER, AUTH } = require('../errors');
const envVar = require('../config/env');

/** helper to set refresh + csrf cookies */
function setRefreshCookies(res, refreshDoc) {
  // refresh cookie (HttpOnly)
  res.cookie(authCookieConfig.name, refreshDoc.token, authCookieConfig.options);
  res.cookie(envVar.XSRF_COOKIE_NAME, refreshDoc.csrfToken, {
    httpOnly: false,
    secure: authCookieConfig.options.secure,
    sameSite: 'lax',
    path: envVar.XSRF_COOKIE_PATH,
  });
}

/** helper to clear refresh cookie */
function clearRefreshCookie(res) {
  res.clearCookie(authCookieConfig.name, {
    path: authCookieConfig.options.path,
    domain: authCookieConfig.options.domain,
  });
  res.clearCookie(envVar.XSRF_COOKIE_NAME, { path: envVar.XSRF_COOKIE_PATH });
}

/** Register */
exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role, deviceFingerprint } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
      return next(
        new ResponseError(
          USER.EMAIL_ALREADY_EXISTS,
          'Email already registered',
          400
        )
      );

    const passwordHash = cryptoUtils.generateHash(password);

    const user = await User.create({
      email,
      passwordHash,
      name,
      role,
    });
    const accessToken = generateAccessToken({
      sub: String(user._id),
      role: user.role,
    });

    const refreshDoc = await issueRefreshToken(user._id, {
      fingerprint: deviceFingerprint,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });

    setRefreshCookies(res, refreshDoc);

    return res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      user: { id: user._id, email: user.email, role: user.role },
      isNewUser: true,
    });
  } catch (err) {
    return next(err);
  }
};

/** Login */
exports.login = async (req, res, next) => {
  try {
    const { email, password, deviceFingerprint } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return next(
        new ResponseError(AUTH.INVALID_CREDENTIALS, 'Invalid credentials', 401)
      );
    const ok = cryptoUtils.verifyHash(password, user.passwordHash);
    if (!ok)
      return next(
        new ResponseError(AUTH.INVALID_CREDENTIALS, 'Invalid credentials', 401)
      );
    if (!user.isActive)
      return next(
        new ResponseError(USER.USER_INACTIVE, 'Account disabled', 403)
      );

    const accessToken = generateAccessToken({
      sub: String(user._id),
      role: user.role,
    });

    const refreshDoc = await issueRefreshToken(user._id, {
      fingerprint: deviceFingerprint,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });

    setRefreshCookies(res, refreshDoc);

    return res.json({
      accessToken,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    return next(err);
  }
};

/** Refresh */
exports.refresh = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies[authCookieConfig.name];
    if (!refreshTokenCookie)
      return next(
        new ResponseError(AUTH.TOKEN_MISSING, 'Refresh token missing', 401)
      );

    const csrfHeader = req.headers['x-csrf-token'];

    const newDoc = await rotateRefreshToken(
      refreshTokenCookie,
      {
        fingerprint: req.body.deviceFingerprint,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
      },
      csrfHeader
    );

    const accessToken = generateAccessToken({
      sub: String(newDoc.user),
      role: req.user.role,
    });

    setRefreshCookies(res, newDoc);

    return res.json({ accessToken });
  } catch (err) {
    return next(err);
  }
};

/** Logout (this device) */
exports.logout = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies[authCookieConfig.name];
    if (refreshTokenCookie) await revokeRefreshToken(refreshTokenCookie);
    clearRefreshCookie(res);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

/** Logout all devices */
exports.logoutAll = async (req, res, next) => {
  try {
    if (!req.user)
      return next(new ResponseError(AUTH.UNAUTHORIZED, 'Unauthorized', 401));
    await revokeAllForUser(req.user._id);
    clearRefreshCookie(res);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};

/** List active sessions */
exports.sessions = async (req, res, next) => {
  try {
    if (!req.user)
      return next(new ResponseError(AUTH.UNAUTHORIZED, 'Unauthorized', 401));
    const sessions = await listActiveSessions(req.user._id);
    return res.json({ sessions });
  } catch (err) {
    return next(err);
  }
};
