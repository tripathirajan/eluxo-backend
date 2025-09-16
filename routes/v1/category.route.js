const categoryRoute = require('express').Router();
const categoryController = require('../../controllers/category.controller');
const validator = require('../../validator');

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 */
categoryRoute.get('/', categoryController.getCategories);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category data
 */
categoryRoute.get(
  '/:id',
  validator('categoryId'),
  categoryController.getCategoryById
);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               parent:
 *                 type: string
 *               icon:
 *                 type: string
 *               banner:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
categoryRoute.post(
  '/',
  validator('createCategory'),
  categoryController.createCategory
);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Update category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               parent:
 *                 type: string
 *               icon:
 *                 type: string
 *               banner:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 */
categoryRoute.put(
  '/:id',
  validator('categoryId'),
  validator('updateCategory'),
  categoryController.updateCategory
);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete category by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Category deleted
 */
categoryRoute.delete(
  '/:id',
  validator('categoryId'),
  categoryController.deleteCategory
);

module.exports = categoryRoute;
