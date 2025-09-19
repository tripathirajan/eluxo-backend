/* eslint-disable security/detect-object-injection */
const { AppError, ResponseError, GENERAL } = require('../errors');
const {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} = require('./category.validate');
const {
  // Admin
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  updateStatusSchema,
  updateStockSchema,
  bulkUpdateStockSchema,
  // Public
  listProductSchema,
  productIdSchema,
  categoryProductsSchema,
  featuredProductsSchema,
  reviewSchema,
} = require('./product.validate');
const {
  singleUploadSchema,
  multiUploadSchema,
} = require('./fileUpload.validate');

const schemaMapper = {
  createCategory: createCategorySchema,
  updateCategory: updateCategorySchema,
  categoryId: categoryIdSchema,
  createProduct: createProductSchema,
  updateProduct: updateProductSchema,
  productId: productIdSchema,
  deleteProduct: deleteProductSchema,
  updateStatus: updateStatusSchema,
  updateStock: updateStockSchema,
  bulkUpdateStock: bulkUpdateStockSchema,
  listProducts: listProductSchema,
  categoryProducts: categoryProductsSchema,
  featuredProducts: featuredProductsSchema,
  review: reviewSchema,
  singleUpload: singleUploadSchema,
  multiUpload: multiUploadSchema,
};

module.exports = (schemaName) => (req, res, next) => {
  // Validation logic here
  if (!Object.keys(schemaMapper).includes(schemaName)) {
    return next(new AppError('Invalid schema', 500, GENERAL.INTERNAL_ERROR));
  }
  const selectedSchema = schemaMapper[schemaName];
  try {
    selectedSchema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
  } catch (error) {
    const firstError = error.issues[0];
    return next(
      new ResponseError(
        GENERAL.VALIDATION_ERROR,
        `${firstError.message} for ${firstError.path.join('.')}` ||
          'Validation error',
        400
      )
    );
  }

  return next();
};
