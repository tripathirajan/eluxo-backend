/**
 * JWT Utility
 *
 * Handles signing and verification of Access and Refresh tokens.
 * Configurable via environment variables:
 * - JWT_ACCESS_SECRET
 * - JWT_REFRESH_SECRET
 * - JWT_ACCESS_EXPIRY
 * - JWT_REFRESH_EXPIRY
 */

const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const ACCESS_TOKEN_EXPIRY = process.env.JWT_ACCESS_EXPIRY || '15m';
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRY || '7d';

/**
 * Sign an Access Token
 * @param {Object} payload - The payload to embed in the token
 * @returns {string} - JWT Access Token
 */
function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

/**
 * Sign a Refresh Token
 * @param {Object} payload - The payload to embed in the token
 * @returns {string} - JWT Refresh Token
 */
function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
}

/**
 * Verify an Access Token
 * @param {string} token - JWT Access Token
 * @returns {Object} - Decoded token payload
 */
function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

/**
 * Verify a Refresh Token
 * @param {string} token - JWT Refresh Token
 * @returns {Object} - Decoded token payload
 */
function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
