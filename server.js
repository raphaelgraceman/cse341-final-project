const express = require('express');
const bodyParser = require('body-parser');
//import the database for assess
const mongodb = require("./database/connect");
const app = express();


const port = process.env.PORT || 8080;
app.use(bodyParser.json())

app
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  
  app.use("/", require("./routes"));
  
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

//Error handler
app.use((err, req, res, nest) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

//A function to initialize mongodb
mongodb.initDb((err) => { // Call the initDb function created in connect of database folder
    if(err) {console.log(err);

    }
    else {
        //listen on the port set above and display the info in the route set
        app.listen(port, () => {
            console.log("Server published and Running on port", port);
        });
    }
})

