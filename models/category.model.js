/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // self-reference for hierarchy
      default: null,
    },
    ancestors: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Category' },
        name: String,
        slug: String,
      },
    ],
    icon: {
      type: String, // Cloudinary URL
    },
    banner: {
      type: String, // Cloudinary URL
    },
    // Filters for faceted search (e.g., size, color, material)
    filters: {
      type: Map,
      of: [String], // Example: { size: ['S','M','L'], color: ['Red','Blue'] }
    },
    status: {
      type: String,
      enum: ['active', 'archived'],
      default: 'active',
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Pre-save middleware to build ancestors
categorySchema.pre('save', async function onCategorySave(next) {
  if (!this.parent) {
    // No parent → reset ancestors
    this.ancestors = [];
    return next();
  }
  try {
    const parentCategory = await mongoose
      .model('Category')
      .findById(this.parent)
      .lean();
    if (parentCategory) {
      this.ancestors = [
        ...(parentCategory.ancestors || []),
        {
          _id: parentCategory._id,
          name: parentCategory.name,
          slug: parentCategory.slug,
        },
      ];
    } else {
      // Invalid parent reference
      this.ancestors = [];
    }

    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('Category', categorySchema);
