//We use different swagger files for each component
//This file is used to combine all the swagger files into one

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Meteo API',
      version: '1.0.0',
      description:
        'API documentation for Meteo microservice responsible for getting the meteo info from Open-Meteo API. Includes JWT validation, Redis cache, and a circuit breaker.',
    },
    servers: [
      {
        url: '/',
        description: 'Development server',
      },
      {
        url: '/api/v1/meteo/',
        description: 'Api Gateway server',
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
  apis: ['./src/api/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

//Use this to serve the swagger documentation
export const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
