module.exports.allowedHelmetKeys = [
  'dnsPrefetchControl',
  'frameguard',
  'hidePoweredBy',
  'ieNoOpen',
  'noSniff',
  'permittedCrossDomainPolicies',
  'referrerPolicy',
  'xssFilter',
  // add other helmet middleware keys as needed
];

module.exports.statusCodes = {
  success: 'SUCCESS',
  internalServerError: 'ERR_INTERNAL_SERVER_ERROR',
  notFound: 'NOT_FOUND',
  badRequest: 'BAD_REQUEST',
  unauthorized: 'UNAUTHORIZED',
  forbidden: 'FORBIDDEN',
  conflict: 'CONFLICT',
  unprocessableEntity: 'UNPROCESSABLE_ENTITY',
  notImplemented: 'NOT_IMPLEMENTED',
  serviceUnavailable: 'SERVICE_UNAVAILABLE',
};

module.exports.httpCodeMapper = {
  [this.statusCodes.notFound]: 404,
  [this.statusCodes.internalServerError]: 500,
  [this.statusCodes.badRequest]: 400,
  [this.statusCodes.unauthorized]: 401,
  [this.statusCodes.forbidden]: 403,
  [this.statusCodes.conflict]: 409,
  [this.statusCodes.unprocessableEntity]: 422,
  [this.statusCodes.notImplemented]: 501,
  [this.statusCodes.serviceUnavailable]: 503,
};
