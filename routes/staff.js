const express = require('express');
const router = require('express').Router();
const staffController = require('../controllers/staff');
const validate = require('../middlewares/staff');
const {isAuthenticated} = require('../middlewares/authenticate');

//Routes for Staff
router.get('/', staffController.getAllStaff);

router.get('/:id', staffController.getStaffById);

router.post('/',  isAuthenticated, validate.addStaffInfo, staffController.addStaff);

router.put('/:id', isAuthenticated, validate.updateStaffInfo, staffController.updateStaffById);

router.delete('/:id', isAuthenticated, staffController.deleteStaffById);


module.exports = router;
