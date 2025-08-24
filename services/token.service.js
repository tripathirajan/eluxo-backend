/* eslint-disable no-underscore-dangle */
const RefreshToken = require('../models/refreshToken.model');
const AppError = require('../errors/AppError');
const { parseDurationToMs } = require('../utils/core');
const jwtUtil = require('../utils/jwt');
const cryptoUtils = require('../utils/crypto');

const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
} = require('../config/env');

const ACCESS_TOKEN_SECRET = JWT_ACCESS_SECRET || '';
const REFRESH_TOKEN_SECRET = JWT_REFRESH_SECRET || '';
const ACCESS_TOKEN_EXPIRY = JWT_ACCESS_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = JWT_REFRESH_EXPIRY || '7d';

/**
 * Issue a new refresh token document for a user + device.
 * Returns the doc (contains token + csrfToken).
 * @param {string} userId
 * @param {Object} deviceInfo
 * @returns {Promise<Object>}
 */
async function issueRefreshToken(userId, deviceInfo) {
  const expiresAt = new Date(
    Date.now() + parseDurationToMs(JWT_REFRESH_EXPIRY)
  );
  const token = jwtUtil.signToken(
    { sub: String(userId) },
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY
  );
  const csrfToken = cryptoUtils.randomUUID();

  const doc = await RefreshToken.create({
    user: userId,
    token,
    csrfToken,
    device: {
      fingerprint: deviceInfo.fingerprint,
      userAgent: deviceInfo.userAgent,
      ip: deviceInfo.ip,
    },
    expiresAt,
  });

  return doc;
}

/**
 * Validate a refresh token (and optional CSRF), returns the stored doc
 * @param {string} token
 * @param {string} csrfHeader
 * @returns {Promise<Object>}
 */
async function validateRefreshToken(token, csrfHeader) {
  // cryptographic validation
  const payload = jwtUtil.verifyToken(token, REFRESH_TOKEN_SECRET);

  // db validation
  const stored = await RefreshToken.findOne({ token }).populate('user');
  if (!stored) throw new AppError('Invalid refresh token', 401);
  if (stored.isRevoked) throw new AppError('Refresh token revoked', 401);
  if (stored.expiresAt < new Date())
    throw new AppError('Refresh token expired', 401);

  if (stored.csrfToken !== csrfHeader) {
    throw new AppError('CSRF token mismatch', 403);
  }

  return { stored, payload };
}

/**
 * Rotate refresh token: revoke old one and issue a new one
 * @param {string} oldToken
 * @param {Object} deviceInfo
 * @param {string} csrfHeader
 * @returns {Promise<Object>}
 */
async function rotateRefreshToken(oldToken, deviceInfo, csrfHeader) {
  const { stored } = await validateRefreshToken(oldToken, csrfHeader);
  stored.isRevoked = true;
  await stored.save();
  return issueRefreshToken(stored.user._id, deviceInfo);
}

/**
 * Revoke a specific refresh token
 * @param {string} token
 */
async function revokeRefreshToken(token) {
  const stored = await RefreshToken.findOne({ token });
  if (stored) {
    stored.isRevoked = true;
    await stored.save();
  }
}
/**
 * Revoke all refresh tokens for a user
 * @param {string} userId
 */
async function revokeAllForUser(userId) {
  await RefreshToken.updateMany(
    { user: userId, isRevoked: false },
    { $set: { isRevoked: true } }
  );
}

/**
 * List active sessions for a user (device sessions)
 * @param {string} userId
 * @returns
 */
async function listActiveSessions(userId) {
  const list = await RefreshToken.find({
    user: userId,
    isRevoked: false,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  return list.map((s) => ({
    id: String(s._id),
    device: s.device,
    createdAt: s.createdAt,
    expiresAt: s.expiresAt,
    lastIp: s.device.ip,
  }));
}

/**
 * Issue a new access token for a user
 * @param {string} userId
 * @returns {string} - JWT Access Token
 */
function issueAccessToken(userId) {
  return jwtUtil.signToken(
    { sub: String(userId) },
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY
  );
}

/**
 * Verify an access token
 * @param {string} token
 * @returns {Object} - The decoded token payload
 */
function verifyAccessToken(token) {
  return jwtUtil.verifyToken(token, ACCESS_TOKEN_SECRET);
}

/**
 * Get a pair of access and refresh tokens for a user
 * @param {string} userId
 * @returns {Object} - The token pair
 */
function getTokenPair(userId) {
  const accessToken = issueAccessToken(userId);
  const refreshToken = issueRefreshToken(userId);
  return { accessToken, refreshToken };
}

module.exports = {
  // refresh
  issueRefreshToken,
  validateRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
  listActiveSessions,
  issueAccessToken,
  verifyAccessToken,
  getTokenPair,
};
