// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    // bcrypt hash of password
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer', 'seller', 'admin'],
      default: 'customer',
    },
    name: { type: String, trim: true },
    phone: { type: String, sparse: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
