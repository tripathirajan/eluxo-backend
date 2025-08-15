const { createLogger, format, transports } = require('winston');

const chalk = require('chalk');
const boxen = require('boxen').default;
const figlet = require('figlet');

const prettyFormat = format.printf(({ message }) => message);

const prettyLogger = createLogger({
  level: 'info',
  format: prettyFormat,
  transports: [new transports.Console()],
});

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

const showInfo = (message) =>
  prettyLogger.info(chalk.green(message), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
  });

const showError = (message) =>
  prettyLogger.info(chalk.red(message), {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
  });

module.exports = {
  banner,
  notice,
  showInfo,
  showError,
};
