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
  // ✅ 2xx Success
  success: 'SUCCESS',
  created: 'CREATED',
  accepted: 'ACCEPTED',
  noContent: 'NO_CONTENT',

  // 🔄 3xx Redirection
  movedPermanently: 'MOVED_PERMANENTLY',
  found: 'FOUND',
  notModified: 'NOT_MODIFIED',
  temporaryRedirect: 'TEMPORARY_REDIRECT',
  permanentRedirect: 'PERMANENT_REDIRECT',

  // ❌ 4xx & 5xx Client / Server Errors
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
  // ✅ 2xx Success
  [this.statusCodes.success]: 200,
  [this.statusCodes.created]: 201,
  [this.statusCodes.accepted]: 202,
  [this.statusCodes.noContent]: 204,

  // 🔄 3xx Redirection
  [this.statusCodes.movedPermanently]: 301,
  [this.statusCodes.found]: 302,
  [this.statusCodes.notModified]: 304,
  [this.statusCodes.temporaryRedirect]: 307,
  [this.statusCodes.permanentRedirect]: 308,

  // ❌ 4xx & 5xx Client / Server Errors
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
