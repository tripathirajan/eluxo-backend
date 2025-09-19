const multer = require('multer');
const { uploadConfig } = require('../config/appConfig');

const storage = multer.memoryStorage();

const { allowedMimeTypes, maxFileSize } = uploadConfig;
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxFileSize },
});

module.exports = upload;
