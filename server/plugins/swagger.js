// server/plugins/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = require('../../config').swaggerConfig;

const swaggerSpec = swaggerJsdoc(options);

function useSwagger(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = useSwagger;
