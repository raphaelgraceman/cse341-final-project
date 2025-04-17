const express = require('express');
const bodyParser = require('body-parser');
//import the database for assess
const mongodb = require("./database/connect");
const app = express();

//Auth required packages
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const port = process.env.PORT || 8080;
app.use(bodyParser.json())

app
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))
    //Setting up express-section
  .use(passport.initialize())
  //use passport on route called
  .use(passport.session())
  //Allow passport access to use express-section
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Request-With, Content-Type, Accept, Z-key'
    );
    res.setHeader('Access-Control-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })

  .use(cors({method: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({origin: '#'}))

  .use("/", require("./routes/index"));
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));


//Adding passport serialized and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user)
});
passport.deserializeUser((user, done) => {
  done(null, user)
});
//session logged in and out endpoints
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')
});
//github callback passport authentication
app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});



//Initializing mongodb
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

// Exporting the app for testing
module.exports = app;
