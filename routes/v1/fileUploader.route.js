const fileUploadRouter = require('express').Router();
const uploader = require('../../middlewares/uploader');
const validate = require('../../validator');
const fileUploadController = require('../../controllers/fileUpload.controller');

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload endpoints
 */

/**
 * @swagger
 * /uploads/multi:
 *   post:
 *     summary: Upload multiple images
 *     description: Protected route for admins to upload multiple product/category/user images at once.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - files
 *               - bucket
 *               - type
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               bucket:
 *                 type: string
 *                 enum: [product, category, user, general]
 *               type:
 *                 type: string
 *                 enum: [banner, thumbnail, cover, image]
 *               prefix:
 *                 type: string
 *                 description: Optional prefix (e.g., SKU, userId)
 *     responses:
 *       201:
 *         description: Files uploaded successfully
 */
fileUploadRouter.post(
  '/multi',
  uploader.array('files', 10),
  validate('multiUpload'),
  fileUploadController.multiUpload
);

/**
 * @swagger
 * /uploads/single:
 *   post:
 *     summary: Upload a single image
 *     description: Protected route for admins to upload product, category, or user images.
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - bucket
 *               - type
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               bucket:
 *                 type: string
 *                 enum: [product, category, user, general]
 *               type:
 *                 type: string
 *                 enum: [banner, thumbnail, cover, image]
 *               prefix:
 *                 type: string
 *                 description: Optional prefix (e.g., SKU, userId)
 *     responses:
 *       201:
 *         description: File uploaded successfully
 */
fileUploadRouter.post(
  '/single',
  uploader.single('file'),
  validate('singleUpload'),
  fileUploadController.singleUpload
);

/**
 * @swagger
 * /uploads/health:
 *   get:
 *     summary: Health check for the upload service
 *     description: Public endpoint to check if the upload service is operational.
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
fileUploadRouter.get('/health', fileUploadController.healthCheck);

module.exports = fileUploadRouter;
