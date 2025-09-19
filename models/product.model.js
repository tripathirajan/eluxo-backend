const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    // Base product images (generic, not per variant)
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    sku: {
      type: String,
      unique: true,
      sparse: true, // optional SKU at product level, variants will have their own
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    stock: {
      type: Number,
      default: 0,
    },

    // ✅ Variants (each with its own SKU, attributes, stock, price, etc.)
    variants: [
      {
        sku: { type: String, unique: true },
        attributes: {
          type: Map,
          of: String, // Example: { size: 'M', color: 'Red' }
        },
        price: Number,
        discountPrice: Number,
        stock: { type: Number, default: 0 },
        images: [{ url: String, alt: String }],
      },
    ],

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    brand: {
      type: String,
      trim: true,
    },

    // Flexible attributes (applies to product as a whole)
    attributes: {
      type: Map,
      of: String,
    },

    tags: [
      {
        type: String,
        trim: true,
        index: true, // Helps with search
      },
    ],

    // Logistics / shipping fields
    logistics: {
      weight: { type: Number }, // grams or kg
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User', // In case of marketplace model
    },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    status: {
      type: String,
      enum: ['active', 'draft', 'archived'],
      default: 'active',
    },

    // Audit fields (for admin tracking)
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
