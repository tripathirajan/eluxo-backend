const { v4: uuidv4 } = require('uuid');

/**
 * Get the root directory path
 * @returns {string} - The root directory path
 */
const getRootDirPath = () => process.cwd();

/**
 * Generate a UUID (v4)
 * @returns {string} - A randomly generated UUID
 */
function uuid() {
  return uuidv4();
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

/**
 * Slugify a string
 * @param {string} text - The input text to slugify
 * @returns {string} - The slugified version of the input text
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // spaces → dash
    .replace(/[^\w-]+/g, '') // remove non-word chars
    .replace(/--+/g, '-'); // collapse dashes
}

module.exports = {
  uuid,
  otp,
  slugify,
  getRootDirPath,
};
