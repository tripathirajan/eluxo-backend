const rateLimit = require('express-rate-limit');

const defaultOptions = {
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: 'draft-8',
  ipv6Subnet: 56,
  message: {
    status: 429,
    error: 'Two many request , please try again few minute',
  },
};
module.exports = (options = {}) => {
  return rateLimit({
    ...defaultOptions,
    ...options,
  });
};
