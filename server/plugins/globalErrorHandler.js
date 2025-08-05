const useGlobalErrorHandler = (app) => {
    console.log('initiating global error handler');
    app.use((err, req, res, next) => {
        console.warn('ResError', err);
        res.error(err);
    });
};

module.exports = useGlobalErrorHandler;
