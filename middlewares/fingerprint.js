const crypto = require('crypto');

module.exports = (req, res, next) => {
  const userAgent = req.headers['user-agent'] || 'unknown-agent';
  const ip = req.ip || req.connection.remoteAddress || 'unknown-ip';

  // Create a hash from userAgent + ip
  res.locals.deviceFingerprint = crypto
    .createHash('sha256')
    .update(`${userAgent}-${ip}`)
    .digest('hex');
  next();
};
