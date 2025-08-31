const { version } = require('../package.json');

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eluxo API',
      version,
      description: 'Eluxo API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3300/api/v1',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/**/*.js'], // files to scan for annotations
};
