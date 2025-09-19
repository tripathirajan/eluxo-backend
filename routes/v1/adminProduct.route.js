const express = require('express');
const productController = require('../../controllers/product.controller');
const validate = require('../../validator');

/**
 * Admin routes
 */
const adminProductRoute = express.Router();

/**
 * @swagger
 * /admin/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               brand:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *             required:
 *               - name
 *               - price
 *               - category
 *               - stock
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */
adminProductRoute.post(
  '/create',
  validate('createProduct'),
  productController.createProductByAdmin
);
/**
 * @swagger
 * /admin/products/all-products:
 *   get:
 *     summary: Get all products (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
adminProductRoute.get(
  '/all-products',
  validate('listProducts'),
  productController.getAdminProducts
);
/**
 * @swagger
 * /admin/products/{id}:
 *   get:
 *     summary: Get product by ID (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
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
adminProductRoute.get(
  '/:id',
  validate('productId'),
  productController.getAdminProductById
);
/**
 * @swagger
 * /admin/products/{id}:
 *   patch:
 *     summary: Update a product by ID (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               stock:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               brand:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
adminProductRoute.patch(
  '/:id',
  validate('updateProduct'),
  productController.updateProductByAdmin
);
/**
 * @swagger
 * /admin/products/{id}:
 *   delete:
 *     summary: Delete a product by ID (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
adminProductRoute.delete(
  '/:id',
  validate('deleteProduct'),
  productController.deleteProductByAdmin
);
/**
 * @swagger
 * /admin/products/{id}/status:
 *   patch:
 *     summary: Update product status by ID (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
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
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Product status updated
 *       404:
 *         description: Product not found
 */
adminProductRoute.patch(
  '/:id/status',
  validate('updateStatus'),
  productController.updateStatusByAdmin
);
/**
 * @swagger
 * /admin/products/{id}/stock:
 *   patch:
 *     summary: Update product stock by ID (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
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
 *               stock:
 *                 type: integer
 *             required:
 *               - stock
 *     responses:
 *       200:
 *         description: Product stock updated
 *       404:
 *         description: Product not found
 */
adminProductRoute.patch(
  '/:id/stock',
  validate('updateStock'),
  productController.updateStockByAdmin
);
/**
 * @swagger
 * /admin/products/bulk-stock:
 *   patch:
 *     summary: Bulk update stock for products (admin)
 *     tags: [Products:Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     stock:
 *                       type: integer
 *                   required:
 *                     - id
 *                     - stock
 *             required:
 *               - updates
 *     responses:
 *       200:
 *         description: Bulk stock updated
 */
adminProductRoute.patch(
  '/bulk-stock',
  validate('bulkUpdateStock'),
  productController.bulkUpdateStockByAdmin
);

module.exports = adminProductRoute;
