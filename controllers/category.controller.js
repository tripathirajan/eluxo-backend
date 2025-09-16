/* eslint-disable security/detect-object-injection */
const Category = require('../models/category.model');
const { ResponseError, CATEGORY } = require('../errors');
const { cleanObject } = require('../utils/core');

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return next(
        new ResponseError(
          CATEGORY.ALREADY_EXISTS,
          'Category already exists',
          409
        )
      );
    }
    const data = cleanObject(req.body);
    const category = new Category(data);
    category.updatedBy = req.user.id;
    category.createdBy = req.user.id;
    await category.save();
    return res.status(201).json(category);
  } catch (err) {
    return next(new ResponseError(CATEGORY.ERROR, err.message, 500));
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    next(new ResponseError(CATEGORY.ERROR, err.message, 500));
  }
};

// Get category by ID
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(
        new ResponseError(CATEGORY.NOT_FOUND, 'Category not found', 404)
      );
    }
    return res.status(200).json(category);
  } catch (err) {
    return next(new ResponseError(CATEGORY.ERROR, err.message, 500));
  }
};

// Update category by ID
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(
        new ResponseError(CATEGORY.NOT_FOUND, 'Category not found', 404)
      );
    }
    Object.assign(category, cleanObject(req.body));
    category.updatedBy = req.user.id;
    await category.save();
    return res.status(200).json(category);
  } catch (err) {
    return next(new ResponseError(CATEGORY.ERROR, err.message, 500));
  }
};

// Delete category by ID
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return next(
        new ResponseError(CATEGORY.NOT_FOUND, 'Category not found', 404)
      );
    }
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    return next(new ResponseError(CATEGORY.ERROR, err.message, 500));
  }
};
