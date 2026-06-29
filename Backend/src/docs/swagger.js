import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Social Media API",
            version: "1.0.0",
            description: "Social Media Backend API Documentation"
        },
        servers: [
            {
                url: "http://localhost:8000/api/v1"
            }
        ]
    },

    apis: [
        "./src/routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;