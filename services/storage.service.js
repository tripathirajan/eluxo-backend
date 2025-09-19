const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const { cloudinaryConfig } = require('../config/appConfig');

// Configure once globally
cloudinary.config(cloudinaryConfig);

/**
 * Stream upload helper
 * @param {Buffer} fileBuffer
 * @param {Object} options
 * @param {string} [options.fileName] - custom file name
 * @param {string} [options.folder] - cloudinary folder (e.g., "products")
 * @param {string} [options.resourceType="image"] - cloudinary resource type
 * @param {Object} [options.transformation] - cloudinary transformations
 * @returns {Promise<Object>} Cloudinary upload response
 */
const streamUploader = (fileBuffer, options = {}) =>
  new Promise((resolve, reject) => {
    if (!fileBuffer) {
      reject(new Error('No file buffer provided for upload.'));
    }

    const {
      fileName,
      folder,
      resourceType = 'image',
      transformation,
    } = options;
    const uploadOptions = {
      public_id: fileName,
      folder,
      resource_type: resourceType,
      transformation,
    };
    try {
      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    } catch (error) {
      reject(error);
    }
  });

/**
 * Auto-generate folder + fileName
 */
const buildUploadPath = ({ bucket, type, prefix }) => {
  const safeBucket = bucket || 'misc';
  const safeType = type || 'image';
  const safePrefix = prefix || 'general';

  // Folder path like: "products/nike" or "categories/mens/shirts"
  const folder = `${safeBucket}/${safePrefix}`;

  // File name like: "banner-1713456789"
  const fileName = `${safeType}-${Date.now()}`;

  return { folder, fileName };
};

/**
 * Storage service
 */
const storageService = {
  /**
   * Upload a file buffer to Cloudinary
   * Auto-builds folder + fileName if bucket/type/prefix provided
   */
  async upload(
    fileBuffer,
    { bucket, type, prefix, resourceType, transformation } = {}
  ) {
    const { folder, fileName } = buildUploadPath({ bucket, type, prefix });
    return streamUploader(fileBuffer, {
      folder,
      fileName,
      resourceType,
      transformation,
    });
  },

  /**
   * Delete a file from Cloudinary
   */
  async delete(publicId, resourceType = 'image') {
    if (!publicId) throw new Error('publicId is required for deletion');

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { resource_type: resourceType },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      );
    });
  },
  /**
   * Check Cloudinary health
   * @returns {Promise<Object>} - Result of the ping operation
   */
  healthCheck() {
    return new Promise((resolve, reject) => {
      cloudinary.api.ping((error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  },
};

module.exports = storageService;
