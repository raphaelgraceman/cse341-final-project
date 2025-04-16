const router = require('express').Router();
const staffRoute = require('./staff');
const studentsRoute = require('./students');
const reportsRoute = require('./reports');
const coursesRoute = require('./courses');
const passport = require('passport');

//#swagger tags =['Hi']
//get api-docs
router.use('/', require('./swagger'));

//use
router.use('/staff', staffRoute);
router.use('/students', studentsRoute);
router.use('/reports', reportsRoute);
router.use('/courses', coursesRoute);

//Authentications
//Auth login route
router.get('/login', passport.authenticate('github'), (res, req) => {});

//Auth logged out route
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { //Checks and return any error and next error if exists, else redirects the user
            return next(err);
        }
    })
    res.redirect('/')
});



module.exports = router;