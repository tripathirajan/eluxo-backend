/* eslint-disable security/detect-object-injection */
function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];

  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      // Skip keys that could be used for injection or prototype pollution
      if (
        typeof key !== 'string' ||
        key.startsWith('$') ||
        key.includes('.') ||
        dangerousKeys.includes(key)
      ) {
        return acc;
      }

      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        return acc;
      }

      if (typeof value === 'string') {
        // Basic HTML tag and script removal
        acc[key] = value
          .replace(/<script.*?>.*?<\/script>/gi, '')
          .replace(/[<>]/g, '')
          .trim();
      } else if (value && typeof value === 'object') {
        acc[key] = sanitizeObject(value);
      } else {
        acc[key] = value;
      }

      return acc;
    },
    Array.isArray(obj) ? [] : {}
  );
}

const sanitizeInput = (req, res, next) => {
  // Recursively sanitize all user input in query, body, and params
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }
  next();
};

const useSanitizer = (app) => {
  app.use(sanitizeInput); // Use custom sanitization middleware
};

module.exports = useSanitizer;
