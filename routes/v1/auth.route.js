const authRoute = require('express').Router();
const authController = require('../../controllers/auth.controller');

// login
authRoute.post('/login', authController.login);

// register
authRoute.post('/register', authController.register);

// refresh
authRoute.post('/refresh', authController.refresh);

// logout
authRoute.post('/logout', authController.logout);

// logoutAll
authRoute.post('/logoutAll', authController.logoutAll);

// active sessions
authRoute.post('/sessions', authController.sessions);

module.exports = authRoute;
