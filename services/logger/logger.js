/* eslint-disable security/detect-object-injection */
const { createLogger, format, transports } = require('winston');

const { getStoreData } = require('../store');
const { loggerConfig } = require('../../config');

const devFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(({ timestamp, level, message, ...meta }) => {
    return `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : ''}`;
  })
);

const prodFormat = format.combine(format.timestamp(), format.json());

const maskSensitive = (obj) => {
  const clone = { ...obj };
  const sensitiveKeys = [
    'password',
    'token',
    'authorization',
    'creditCard',
    'pwd',
  ];
  sensitiveKeys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(clone, key) && clone[key]) {
      clone[key] = '***MASKED***';
    }
  });
  return clone;
};
const loggerInstance = createLogger({
  level: loggerConfig.level,
  format: loggerConfig.prettyPrint ? devFormat : prodFormat,
  transports: [new transports.Console()],
});

function log(level, message, meta = {}) {
  const context = getStoreData() || {};
  const maskedMeta = maskSensitive({ ...context, ...meta });
  loggerInstance.log(level, message, maskedMeta);
}

module.exports = {
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
  serializeRequest: (req) => loggerConfig.serializers.req(req),
  serializeResponse: (res) => loggerConfig.serializers.res(res),
};
