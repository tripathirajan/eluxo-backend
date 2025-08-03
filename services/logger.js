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
  info: (message, metadata) => log({ level: 'info', message, ...metadata }),
  error: (message, metadata) => log({ level: 'error', message, ...metadata }),
  warn: (message, metadata) => log({ level: 'warn', message, ...metadata }),
  debug: (message, metadata) => log({ level: 'debug', message, ...metadata }),
  trace: (message, metadata) => log({ level: 'trace', message, ...metadata }),
};
