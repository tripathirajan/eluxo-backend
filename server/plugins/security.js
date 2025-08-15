/* eslint-disable security/detect-object-injection */
const helmet = require('helmet');
const { appConfig, constant: _ } = require('../../config');

function useHelmet(app) {
  const {
    contentSecurityPolicy = false,
    hsts,
    ...other
  } = appConfig.helmetConfig || {};

  // Apply base helmet config
  app.use(helmet({ contentSecurityPolicy }));

  // Dynamically apply submodules (except hsts)
  Object.entries(other).forEach(([key, config]) => {
    if (
      key !== 'hsts' &&
      _.allowedHelmetKeys.includes(key) &&
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
