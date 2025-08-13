const bcrypt = require('bcrypt');

const DEFAULT_SALT_ROUNDS = 10;

/**
 * Hash a password string
 * @param {string} password - plain text password
 * @returns {Promise<string>} hashed password
 */
async function hashPassword(password) {
  if (!password) throw new Error('Password is required for hashing');
  return bcrypt.hash(password, DEFAULT_SALT_ROUNDS);
}

/**
 * Compare plain password with hashed password
 * @param {string} plain - plain text password
 * @param {string} hashed - hashed password from DB
 * @returns {Promise<boolean>}
 */
async function comparePassword(plain, hashed) {
  if (!plain || !hashed) return false;
  return bcrypt.compare(plain, hashed);
}

/**
 * Generic hashing for any value
 * @param {string} value - string to hash
 * @param {number} saltRounds - optional salt rounds
 * @returns {Promise<string>}
 */
async function hashValue(value, saltRounds = DEFAULT_SALT_ROUNDS) {
  if (!value) throw new Error('Value is required for hashing');
  return bcrypt.hash(value, saltRounds);
}

/**
 * Compare any value with its hash
 * @param {string} plain - original string
 * @param {string} hashed - hashed string
 * @returns {Promise<boolean>}
 */
async function compareValue(plain, hashed) {
  if (!plain || !hashed) return false;
  return bcrypt.compare(plain, hashed);
}

module.exports = {
  hashPassword,
  comparePassword,
  hashValue,
  compareValue,
};
