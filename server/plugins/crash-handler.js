module.exports = () => {
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    /* eslint-disable no-process-exit */
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    /* eslint-disable no-process-exit */
    process.exit(1);
  });
};
