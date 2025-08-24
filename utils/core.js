const { v4: uuidv4 } = require('uuid');

const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = 60 * ONE_SECOND_MS;
const ONE_HOUR_MS = 60 * ONE_MINUTE_MS;
const ONE_DAY_MS = 24 * ONE_HOUR_MS;

/**
 * Parses a duration string (e.g., "15m", "12h", "7d") into milliseconds.
 * @param {string} val - The duration string to parse.
 * @returns {number} - The duration in milliseconds.
 */
function parseDurationToMs(val = '7d') {
  const m = /^(\d+)([smhd])$/.exec(String(val).trim());
  if (!m) return 7 * ONE_DAY_MS;
  const n = Number(m[1]);
  const unit = m[2];

  let multi;
  switch (unit) {
    case 's':
      multi = ONE_SECOND_MS;
      break;
    case 'm':
      multi = ONE_MINUTE_MS;
      break;
    case 'h':
      multi = ONE_HOUR_MS;
      break;
    case 'd':
      multi = ONE_DAY_MS;
      break;
    default:
      multi = ONE_DAY_MS;
  }
  return n * multi;
}

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
  parseDurationToMs,
};
