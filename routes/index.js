const router = require('express').Router();

const staffRoute = require('./staff');
const studentsRoute = require('./students');

router.use('/', require('./swagger'));


router.get("/", (req, res) => {  
    //#swagger tags =['Hello Swagger]
    res.send("Hello")
});

router.use('/', require('./swagger'));
//use staff route
router.use('/staff', staffRoute);

//Returns Student information
router.use('/students', studentsRoute);




module.exports = router;