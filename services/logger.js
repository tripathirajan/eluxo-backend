/* eslint-disable security/detect-object-injection */
const winston = require('winston');
const chalk = require('chalk');
const boxen = require('boxen').default;
const figlet = require('figlet');

const { getStoreData } = require('./store');

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

const loggerInstance = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});
const prettyFormat = winston.format.printf(({ message }) => message);

const prettyLogger = winston.createLogger({
  level: 'info',
  format: prettyFormat,
  transports: [new winston.transports.Console()],
});

function log(level, message, meta = {}) {
  const context = getStoreData() || {};
  const maskedMeta = maskSensitive({ ...context, ...meta });
  loggerInstance.log(level, message, maskedMeta);
}

const notice = (message) =>
  prettyLogger.info(
    boxen(chalk.redBright(message), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
    })
  );

const banner = (message) =>
  prettyLogger.info(
    chalk.magenta(figlet.textSync(message, { font: 'Standard' }))
  );

const showMsg = (message) =>
  prettyLogger.info(chalk.green(message), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
  });
const showErrorMsg = (message) =>
  prettyLogger.info(chalk.red(message), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
  });

module.exports = {
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
  prettyLogger: { banner, notice, showMsg, showErrorMsg },
};
