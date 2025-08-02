const log = (payload) => {
  const logData = {
    timestamp: new Date().toISOString(),
    level: payload.level || 'info',
    ...payload,
  };
  const stream = payload.level === 'error' ? process.stderr : process.stdout;
  stream.write(`${JSON.stringify(logData)}\n`);
};

module.exports = {
  info: (message) => log({ level: 'info', message }),
  error: (message) => log({ level: 'error', message }),
  warn: (message) => log({ level: 'warn', message }),
  debug: (message) => log({ level: 'debug', message }),
  trace: (message) => log({ level: 'trace', message }),
};
