const notFound = (req, res, next) => {
  if (!res.headersSent) {
    res.status(404).json({
      message: 'Service not available',
      success: false,
    });
  } else {
    next();
  }
};

module.exports = notFound;
