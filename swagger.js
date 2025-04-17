const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CRUD API',
    description: 'CRUD PRACTICE API'
  },
  host: 'cse341-final-project-85h6.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// auto generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);