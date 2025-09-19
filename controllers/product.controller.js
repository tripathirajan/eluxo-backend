const Product = require('../models/product.model');
const {
  asyncHandler,
  cleanObject,
  standardizeResponse,
} = require('../utils/core');
const { ResponseError, PRODUCT } = require('../errors');

/**
 * common methods
 */
/**
 * Get products with pagination
 * @param {*} param0
 * @returns
 */
const getProductsWithPagination = async ({
  page = 1,
  limit = 10,
  category,
  priceMin,
  priceMax,
  search,
  sort,
}) => {
  const query = { status: 'active' };
  if (category) query.categoryId = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  if (priceMin || priceMax) query.price = {};
  if (priceMin) query.price.$gte = Number(priceMin);
  if (priceMax) query.price.$lte = Number(priceMax);

  let productsQuery = Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  if (sort === 'price') productsQuery = productsQuery.sort({ price: 1 });
  if (sort === 'rating') productsQuery = productsQuery.sort({ rating: -1 });
  if (sort === 'latest') productsQuery = productsQuery.sort({ createdAt: -1 });

  const products = await productsQuery;
  const total = await Product.countDocuments(query);
  return {
    products,
    pagination: { page: Number(page), limit: Number(limit), total },
  };
};

// admin controllers
exports.createProductByAdmin = asyncHandler(async (req, res) => {
  const data = cleanObject(req.body);
  const product = await Product.create(data);
  res
    .status(201)
    .json(standardizeResponse({ data: product, message: 'Product created' }));
});

exports.getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('category');
  res.status(200).json(standardizeResponse({ data: products }));
});

exports.getAdminProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) {
    return next(new ResponseError(PRODUCT.NOT_FOUND, 'Product not found', 404));
  }
  return res.status(200).json(standardizeResponse({ data: product }));
});

exports.updateProductByAdmin = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ResponseError(PRODUCT.NOT_FOUND, 'Product not found', 404));
  }
  Object.assign(product, cleanObject(req.body));
  await product.save();
  return res
    .status(200)
    .json(standardizeResponse({ data: product, message: 'Product updated' }));
});

exports.deleteProductByAdmin = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ResponseError(PRODUCT.NOT_FOUND, 'Product not found', 404));
  }
  await product.remove();
  return res.status(200).json(
    standardizeResponse({
      data: req.params.id,
      message: 'Product deleted successfully',
    })
  );
});

exports.updateStatusByAdmin = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(
    standardizeResponse({
      success: true,
      data: product,
      message: 'Status updated',
    })
  );
});

exports.updateStockByAdmin = asyncHandler(async (req, res) => {
  const { stock } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { stock },
    { new: true }
  );
  res.json(standardizeResponse({ success: true, data: product }));
});

// Bulk update stock
exports.bulkUpdateStockByAdmin = asyncHandler(async (req, res) => {
  const { updates } = req.body; // Expecting an array of { id, stock }
  const updatePromises = updates.map(({ id, stock }) =>
    Product.findByIdAndUpdate(id, { stock }, { new: true })
  );
  const updatedProducts = await Promise.all(updatePromises);
  res.json(standardizeResponse({ success: true, data: updatedProducts }));
});

/**
 * Public controllers
 */

exports.getProducts = asyncHandler(async (req, res) => {
  const { products, pagination } = await getProductsWithPagination({
    ...req.query,
  });
  res.json(
    standardizeResponse({
      success: true,
      data: products,
      pagination,
    })
  );
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product || product.status !== 'active')
    return new ResponseError(PRODUCT.NOT_FOUND, 'Product not found', 404);

  return res.json(standardizeResponse({ success: true, data: product }));
});

exports.getProductsByCategory = asyncHandler(async (req, res) => {
  req.query.category = req.params.categoryId;
  const { products, pagination } = await getProductsWithPagination({
    ...req.query,
  });
  res.json(standardizeResponse({ success: true, data: products, pagination }));
});

exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  req.query.limit = req.query.limit || 10;
  const products = await Product.find({
    status: 'active',
    featured: true,
  }).limit(Number(req.query.limit));
  res.json(standardizeResponse({ success: true, data: products }));
});

exports.getNewArrivals = asyncHandler(async (req, res) => {
  req.query.limit = req.query.limit || 10;
  const products = await Product.find({ status: 'active' })
    .sort({ createdAt: -1 })
    .limit(Number(req.query.limit));
  res.json(standardizeResponse({ success: true, data: products }));
});

exports.getTopRatedProducts = asyncHandler(async (req, res) => {
  req.query.limit = req.query.limit || 10;
  const products = await Product.find({ status: 'active' })
    .sort({ rating: -1 })
    .limit(Number(req.query.limit));
  res.json(standardizeResponse({ success: true, data: products }));
});

// Reviews (simplified)
exports.getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(standardizeResponse({ success: true, data: product.reviews || [] }));
});

exports.addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  product.reviews.push({ user: req.user.id, rating, comment });
  await product.save();
  res.json(standardizeResponse({ success: true, data: product.reviews }));
});
