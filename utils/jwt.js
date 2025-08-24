const jwt = require('jsonwebtoken');

/**
 * Sign a Token
 * @param {Object} payload - The payload to embed in the token
 * @param {string} secret - The secret key to sign the token
 * @param {string} expiresIn - The expiration time for the token
 * @returns {string} - JWT Token
 */
function signToken(payload, secret, expiresIn) {
  if (!payload || !secret || !expiresIn) return null;
  return jwt.sign(payload, secret, {
    expiresIn,
  });
}

/**
 * Verify a Token
 * @param {string} token
 * @param {string} secret
 * @returns
 */
function verifyToken(token, secret) {
  if (!token || !secret) return null;
  return jwt.verify(token, secret);
}

module.exports = {
  signToken,
  verifyToken,
};
