const useErrorHandler = (app) => {
  app.use((err, req, res) => {
    console.error('Global Error:', err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
    });
  });
};

module.exports = useErrorHandler;
