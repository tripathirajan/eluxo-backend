const { z } = require('zod');

// Shared helpers
const bucketEnum = z.enum(['product', 'category', 'user', 'general']);
const typeEnum = z.enum(['banner', 'thumbnail', 'cover', 'image']);

// ========== Single Upload ==========
const singleUploadSchema = z.object({
  body: z.object({
    bucket: bucketEnum,
    type: typeEnum,
    prefix: z.string(), // e.g., SKU, userId
  }),
});

// ========== Multi Upload ==========
const multiUploadSchema = z.object({
  body: z.object({
    bucket: bucketEnum,
    type: typeEnum,
    prefix: z.string(),
  }),
});

module.exports = {
  singleUploadSchema,
  multiUploadSchema,
};
