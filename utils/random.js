/**
 * Random Generator Utility
 * Generates UUID, random strings, and OTPs.
 */

const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

/**
 * Generate a UUID (v4)
 * @returns {string} - A randomly generated UUID
 */
function uuid() {
  return uuidv4();
}

/**
 * Generate a random hexadecimal string
 * @param {number} [length=16] - The number of random bytes to generate (string will be twice as long in hex)
 * @returns {string} - Randomly generated hexadecimal string
 */
function randomString(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generate a numeric One-Time Password (OTP)
 * @param {number} [length=6] - Length of the OTP in digits
 * @returns {string} - A string of numeric digits of the given length
 */
function otp(length = 6) {
  return Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, '0');
}

module.exports = { uuid, randomString, otp };
