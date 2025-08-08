/**
 * HMAC Signature Utility
 * Used for signing/verifying webhook requests or API calls.
 */

const crypto = require('crypto');

/** * Sign data using HMAC with SHA-256
 * @param {string} data - The data to sign
 * @param {string} secret - The secret key used for signing
 * @returns {string} - The HMAC signature in hexadecimal format
 */
function sign(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Verify HMAC signature
 * @param {string} data - The original data that was signed
 * @param {string} secret - The secret key used for signing
 * @param {string} signature - The HMAC signature to verify against
 * @returns {boolean} - True if the signature matches, false otherwise
 */
function verify(data, secret, signature) {
  return sign(data, secret) === signature;
}

module.exports = { sign, verify };
