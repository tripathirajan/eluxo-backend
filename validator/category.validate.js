const { z } = require('zod');

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId');

const baseCategorySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required').toLowerCase(),
  description: z.string().optional(),
  parent: z.preprocess(
    (val) => (val === '' ? undefined : val),
    objectId.optional().nullable()
  ),
  icon: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url('Invalid icon URL').optional()
  ),
  banner: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.string().url('Invalid banner URL').optional()
  ),
  filters: z
    .record(z.array(z.string()))
    .optional()
    .describe('Faceted filters like { size: ["S","M"], color: ["Red"] }'),
  status: z.enum(['active', 'archived']).default('active'),
  createdBy: objectId.optional(),
  updatedBy: objectId.optional(),
});

// For creating category
const createCategorySchema = z.object({
  body: baseCategorySchema.omit({
    createdBy: true,
    updatedBy: true,
  }),
});

// For updating category (all fields optional)
const updateCategorySchema = z.object({
  body: baseCategorySchema.partial(),
});

// For fetching/deleting by ID
const categoryIdSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
};
