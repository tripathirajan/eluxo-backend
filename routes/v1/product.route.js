const express = require('express');
const productController = require('../../controllers/product.controller');
const validate = require('../../validator');

/**
 * Public routes
 */
const productRoute = express.Router();
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (public)
 *     tags: [Products:Public]
 *     responses:
 *       200:
 *         description: List of products
 */
productRoute.get('/', validate('listProducts'), productController.getProducts);
/**
 * @swagger
 * /products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Products:Public]
 *     responses:
 *       200:
 *         description: List of featured products
 */
productRoute.get(
  '/featured',
  validate('featuredProducts'),
  productController.getFeaturedProducts
);
/**
 * @swagger
 * /products/new-arrivals:
 *   get:
 *     summary: Get new arrival products
 *     tags: [Products:Public]
 *     responses:
 *       200:
 *         description: List of new arrivals
 */
productRoute.get(
  '/new-arrivals',
  validate('listProducts'),
  productController.getNewArrivals
);
/**
 * @swagger
 * /products/top-rated:
 *   get:
 *     summary: Get top rated products
 *     tags: [Products:Public]
 *     responses:
 *       200:
 *         description: List of top rated products
 */
productRoute.get(
  '/top-rated',
  validate('listProducts'),
  productController.getTopRatedProducts
);
/**
 * @swagger
 * /products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products:Public]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: List of products in category
 *       404:
 *         description: Category not found
 */
productRoute.get(
  '/category/:categoryId',
  validate('categoryProducts'),
  productController.getProductsByCategory
);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID (public)
 *     tags: [Products:Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
productRoute.get(
  '/:id',
  validate('productId'),
  productController.getProductById
);
/**
 * @swagger
 * /products/{id}/reviews:
 *   get:
 *     summary: Get reviews for a product
 *     tags: [Products:Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of reviews
 *       404:
 *         description: Product not found
 */
productRoute.get(
  '/:id/reviews',
  validate('productId'),
  productController.getProductReviews
);
/**
 * @swagger
 * /products/{id}/review:
 *   post:
 *     summary: Add a review to a product
 *     tags: [Products:Public]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *             required:
 *               - rating
 *     responses:
 *       201:
 *         description: Review added
 *       400:
 *         description: Validation error
 */
productRoute.post(
  '/:id/review',
  validate('review'),
  productController.addProductReview
);
module.exports = productRoute;
