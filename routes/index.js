const router = require('express').Router();

const staffRoute = require('./staff')
const studentsRoute = require('./staff')

router.use('/', require('./swagger'));


router.get("/", (req, res) => {  
    //#swagger tags =['Hello Swagger]
    res.send("Hello")
});

router.use('/', require('./swagger'));
//use route all staff information
router.use('/staff', staffRoute);

//Returns Student information
router.use('/students', studentsRoute);




module.exports = router;