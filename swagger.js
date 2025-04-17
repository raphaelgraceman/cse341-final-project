const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CRUD API',
    description: 'CRUD PRACTICE API'
  },
  host: 'localhost:8080',
  schemes: ['https', 'http']
}; //cse341-final-project-85h6.onrender.com

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// auto generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);