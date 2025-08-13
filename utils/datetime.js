/**
 * DateTime Utility
 *
 * Provides helper functions for date and time formatting, manipulation, and comparison.
 * Uses the `dayjs` library for lightweight date operations.
 */

const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

/**
 * Get the current date-time in ISO 8601 format
 * @returns {string}
 */
function nowISO() {
  return dayjs().toISOString();
}

/**
 * Format a date using a given format string
 * @param {string|Date} date
 * @param {string} format - e.g., 'YYYY-MM-DD HH:mm:ss'
 * @returns {string}
 */
function format(date, dateFormat = 'YYYY-MM-DD') {
  return dayjs(date).format(dateFormat);
}

/**
 * Add days to a given date
 * @param {string|Date} date
 * @param {number} days
 * @returns {string}
 */
function addDays(date, days) {
  return dayjs(date).add(days, 'day').toISOString();
}

/**
 * Subtract days from a given date
 * @param {string|Date} date
 * @param {number} days
 * @returns {string}
 */
function subtractDays(date, days) {
  return dayjs(date).subtract(days, 'day').toISOString();
}

/**
 * Check if a date is in the past
 * @param {string|Date} date
 * @returns {boolean}
 */
function isPast(date) {
  return dayjs(date).isBefore(dayjs());
}

/**
 * Get human-readable relative time (e.g., "2 days ago")
 * @param {string|Date} date
 * @returns {string}
 */
function fromNow(date) {
  return dayjs(date).fromNow();
}

module.exports = {
  nowISO,
  format,
  addDays,
  subtractDays,
  isPast,
  fromNow,
};
