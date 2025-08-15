const envVar = require('./env');

const devEnvList = ['local', 'development'];
const isDevEnv = devEnvList.includes(envVar.NODE_ENV);

module.exports = {
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: isDevEnv,
  formats: {
    timestamp: true,
    colorize: true,
    json: !isDevEnv,
  },
  serializers: {
    req: (req) => ({
      id: req.id || req.requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      correlationId: req.headers['x-correlation-id'] || req.correlationId,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
};
