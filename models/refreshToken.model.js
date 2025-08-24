// models/RefreshToken.js
const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
    csrfToken: {
      type: String,
    },
    device: {
      fingerprint: { type: String },
      userAgent: { type: String },
      ip: { type: String },
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    isRevoked: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true }
);

refreshTokenSchema.index({ user: 1, token: 1 });

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
