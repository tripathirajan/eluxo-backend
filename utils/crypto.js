const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { APP_SECRET } = require('../config/env');

const DEFAULT_SALT_ROUNDS = 10;

/**
 * Generate a random hexadecimal string
 * @param {number} [length=16] - The number of random bytes to generate (string will be twice as long in hex)
 * @returns {string} - Randomly generated hexadecimal string
 */
function randomHexString(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Sign data using HMAC with SHA-256
 * @param {string} data - The data to sign
 * @returns {string} - The HMAC signature in hexadecimal format
 */
function signWithHMAC(data) {
  return crypto.createHmac('sha256', APP_SECRET).update(data).digest('hex');
}

/**
 * Verify HMAC signature
 * @param {string} data - The original data that was signed
 * @param {string} signature - The HMAC signature to verify against
 * @returns {boolean} - True if the signature matches, false otherwise
 */
function verifyHMAC(data, signature) {
  return signWithHMAC(data) === signature;
}

/**
 * Generate a random Base64 string
 * @param {number} [length=16] - The number of random bytes to generate (string will be longer in base64)
 * @returns {string} - Randomly generated Base64 string
 */
function randomBase64String(length = 16) {
  return crypto.randomBytes(length).toString('base64');
}

/**
 * Generate a hash from the plaintext and salt
 * @param {string} planText
 * @param {string} salt
 * @returns {string|null}
 */
function generateHashWithSalt(planText, salt) {
  if (!planText || !salt) return null;

  return bcrypt.hashSync(planText, salt);
}

/**
 * Generate a hash from the plaintext and saltRounds
 * @param {string} planText
 * @param {number} saltRounds
 * @returns {string|null}
 */
function generateHash(planText, saltRounds = DEFAULT_SALT_ROUNDS) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return generateHashWithSalt(planText, salt);
}

/**
 * Verify a hashed string against a plaintext
 * @param {string} planText
 * @param {string} hash
 * @returns {boolean}
 */
function verifyHash(planText, hash) {
  if (!planText || !hash) return false;
  return bcrypt.compareSync(planText, hash);
}

module.exports = {
  randomHexString,
  signWithHMAC,
  verifyHMAC,
  randomBase64String,
  generateHash,
  generateHashWithSalt,
  verifyHash,
};
