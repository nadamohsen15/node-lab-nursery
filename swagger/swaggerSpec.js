const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nursery API',
            version: '1.0.0',
            description: 'This is a RESTful API for a nursery.',
        },
    },
    servers: [
        {
            url: "http://localhost:8080",
            description: "Local server"
        }
    ],
    apis: ['./Route/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;