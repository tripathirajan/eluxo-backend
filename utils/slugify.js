/**
 * Slugify Utility
 * Converts text into URL-friendly slugs.
 */

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

module.exports = slugify;
