const storageService = require('../services/storage.service');
const { ResponseError, GENERAL } = require('../errors');
const { standardizeResponse } = require('../utils/core');

/**
 * Single file upload
 * @route POST /uploads/single
 */
exports.singleUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(
        new ResponseError(GENERAL.VALIDATION_ERROR, 'No file uploaded', 400)
      );
    }

    const { bucket, type, prefix } = req.body;

    const result = await storageService.upload(req.file.buffer, {
      bucket,
      type,
      prefix,
    });

    return res.status(201).json(
      standardizeResponse({
        data: {
          url: result.secure_url,
          public_id: result.public_id,
          bucket,
          type,
          prefix,
        },
        message: 'File uploaded successfully',
      })
    );
  } catch (error) {
    return next(new ResponseError(GENERAL.INTERNAL_ERROR, error.message, 500));
  }
};

/**
 * Multi file upload
 * @route POST /uploads/multi
 */
exports.multiUpload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(
        new ResponseError(GENERAL.VALIDATION_ERROR, 'No files uploaded', 400)
      );
    }

    const { bucket, type, prefix } = req.body;

    const uploadPromises = req.files.map((file) =>
      storageService.upload(file.buffer, { bucket, type, prefix })
    );

    const results = await Promise.all(uploadPromises);

    return res.status(201).json(
      standardizeResponse({
        count: results.length,
        data: results.map((r) => ({
          url: r.secure_url,
          public_id: r.public_id,
          bucket,
          type,
          prefix,
        })),
        message: 'Files uploaded successfully',
      })
    );
  } catch (error) {
    return next(new ResponseError(GENERAL.INTERNAL_ERROR, error.message, 500));
  }
};

/**
 * Health check for the file upload service
 * @param {*} req
 * @param {*} res
 */
exports.healthCheck = async (req, res) => {
  const health = await storageService.healthCheck();
  res.status(200).json(
    standardizeResponse({
      data: { status: 'ok', health },
      message: 'File upload service is healthy',
    })
  );
};
