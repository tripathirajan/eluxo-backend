/**
 * API Key Generator Utility
 * Generates secure API keys for internal services or partners.
 */

const crypto = require('crypto');

/** * Generate a secure API key
 * @param {number} [length=32] - Length of the API key in bytes
 * @returns {string} - A securely generated API key in hexadecimal format
 */
function generateApiKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = { generateApiKey };
