// Custom middleware to sanitize input fields and prevent MongoDB operator injection
const sanitizeInput = (req, res, next) => {
  // Helper to recursively sanitize objects
  function sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    return Object.keys(obj).reduce(
      (acc, key) => {
        // Skip keys starting with $ (MongoDB operator injection)
        if (key.startsWith('$')) return acc;
        const value = obj[key];
        if (typeof value === 'string') {
          acc[key] = value.replace(/[<>]/g, '');
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

  if (req.query && typeof req.query === 'object')
    req.query = sanitizeObject(req.query);
  if (req.body && typeof req.body === 'object')
    req.body = sanitizeObject(req.body);
  if (req.params && typeof req.params === 'object')
    req.params = sanitizeObject(req.params);
  next();
};

const useSanitizer = (app) => {
  app.use(sanitizeInput); // custom input and mongo sanitizer
};

module.exports = useSanitizer;
