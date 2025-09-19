const { z } = require('zod');

// Helper: ObjectId validation
const objectId = () =>
  z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

// ========== Shared Schemas ==========
const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
});

const variantSchema = z.object({
  sku: z.string(),
  attributes: z.record(z.string()),
  price: z.number(),
  discountPrice: z.number().optional(),
  stock: z.number().int().min(0),
  images: z.array(imageSchema).optional(),
});

const logisticsSchema = z.object({
  weight: z.number().optional(),
  dimensions: z
    .object({
      length: z.number(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
});

const ratingSchema = z.object({
  average: z.number().min(0).max(5).optional(),
  count: z.number().int().min(0).optional(),
});

// ========== Base Product Schema ==========
const baseProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  images: z.array(imageSchema).optional(),
  sku: z.string().optional(),
  price: z.number(),
  discountPrice: z.number().optional(),
  currency: z.string().default('INR'),
  stock: z.number().int().min(0).optional(),
  variants: z.array(variantSchema).optional(),
  category: objectId(),
  brand: z.string().optional(),
  attributes: z.record(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  logistics: logisticsSchema.optional(),
  seller: objectId().optional(),
  status: z.enum(['active', 'draft', 'archived']).optional(),
  rating: ratingSchema.optional(), // server-calculated, not for create/update
});

// ========== Admin Validations ==========
const createProductSchema = z.object({
  body: baseProductSchema.omit({ rating: true }),
});

const updateProductSchema = z.object({
  params: z.object({ id: objectId() }),
  body: baseProductSchema.omit({ rating: true }).partial(),
});

const deleteProductSchema = z.object({
  params: z.object({ id: objectId() }),
});

const updateStatusSchema = z.object({
  params: z.object({ id: objectId() }),
  body: z.object({
    status: z.enum(['active', 'draft', 'archived']),
  }),
});

const updateStockSchema = z.object({
  params: z.object({ id: objectId() }),
  body: z.object({
    stock: z.number().int().min(0),
  }),
});

const bulkUpdateStockSchema = z.object({
  body: z.object({
    updates: z.array(
      z.object({
        id: objectId(),
        stock: z.number().int().min(0),
      })
    ),
  }),
});

// ========== Public Validations ==========
const listProductSchema = z.object({
  query: z.object({
    page: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
    limit: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
    category: objectId().optional(),
    priceMin: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
    priceMax: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
    search: z.string().optional(),
    sort: z.enum(['price', 'rating', 'latest']).optional(),
  }),
});

const productIdSchema = z.object({
  params: z.object({
    id: objectId(),
  }),
});

const categoryProductsSchema = z.object({
  params: z.object({ categoryId: objectId() }),
  query: listProductSchema.shape.query,
});

const featuredProductsSchema = z.object({
  query: z.object({
    limit: z
      .string()
      .regex(/^[0-9]+$/)
      .optional(),
  }),
});

const reviewSchema = z.object({
  params: z.object({ id: objectId() }),
  body: z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().optional(),
  }),
});

// ========== Exports ==========
module.exports = {
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
};
