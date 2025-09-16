/* eslint-disable security/detect-object-injection */
const { AppError, ResponseError, CATEGORY, GENERAL } = require('../errors');
const {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} = require('./category.validate');

const schemaMapper = {
  createCategory: createCategorySchema,
  updateCategory: updateCategorySchema,
  categoryId: categoryIdSchema,
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
    console.log(error);
    return next(
      new ResponseError(CATEGORY.VALIDATION_ERROR, error[0].message, 400)
    );
  }

  return next();
};
