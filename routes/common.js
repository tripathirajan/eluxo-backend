const express = require('express');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Ping (simple connectivity check)
router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Version (could read from package.json or env)
router.get('/version', (req, res) => {
  // eslint-disable-next-line global-require
  const { version, name } = require('../package.json');
  res.status(200).json({
    name,
    version,
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
