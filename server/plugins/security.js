/* eslint-disable security/detect-object-injection */
const helmet = require('helmet');
const { helmetConfig } = require('../../config/appConfig');
const { allowedHelmetKeys } = require('../../config/constant');

function useHelmet(app) {
  const { contentSecurityPolicy = false, hsts, ...other } = helmetConfig || {};

  // Apply base helmet config
  app.use(helmet({ contentSecurityPolicy }));

  // Dynamically apply submodules (except hsts)
  Object.entries(other).forEach(([key, config]) => {
    if (
      key !== 'hsts' &&
      allowedHelmetKeys.includes(key) &&
      typeof helmet[key] === 'function'
    ) {
      app.use(helmet[key](config));
    }
  });

  // Conditionally apply HSTS
  if (hsts && process.env.NODE_ENV === 'production') {
    app.use(helmet.hsts(hsts));
  }
}

module.exports = useHelmet;
