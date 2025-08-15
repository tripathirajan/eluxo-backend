const express = require('express');
const path = require('path');
const { getRootDirPath } = require('../../utils/appPath');

const PUBLIC_PATH = path.join(getRootDirPath(), 'public');

const useStaticAssets = (app) => {
  app.use(
    express.static(PUBLIC_PATH, {
      maxAge: '1d',
      etag: true,
      setHeaders: (res, reqPath) => {
        if (reqPath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      },
    })
  );
};

module.exports = useStaticAssets;
