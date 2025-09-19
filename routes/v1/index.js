const apiV1Router = require('express').Router();
const authGuard = require('../../middlewares/authGuard');
const roleGuard = require('../../middlewares/roleGuard');
const authRoute = require('./auth.route');
const {
  categoryPrivateRoute,
  categoryPublicRoute,
} = require('./category.route');
const adminProductRoute = require('./adminProduct.route');
const productRoute = require('./product.route');
const fileUploadRouter = require('./fileUploader.route');
/**
 * Protected routes
 */

apiV1Router.use(
  '/admin/category',
  authGuard,
  roleGuard(['superadmin', 'admin']),
  categoryPrivateRoute
);
apiV1Router.use(
  '/admin/product',
  authGuard,
  roleGuard(['superadmin', 'admin', 'seller']),
  adminProductRoute
);
apiV1Router.use(
  '/uploads',
  authGuard,
  roleGuard(['superadmin', 'admin', 'seller']),
  fileUploadRouter
);

/**
 * Public routes
 */
apiV1Router.use('/auth', authRoute);
apiV1Router.use('/product', productRoute);
apiV1Router.use('/category', categoryPublicRoute);

module.exports = apiV1Router;
