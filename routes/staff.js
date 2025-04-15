const express = require('express');
const router = require('express').Router();
const staffController = require('../controllers/staff');
const validate = require('../middlewares/staff');

//Routes for Staff
router.get('/', staffController.getAllStaff);

router.get('/:id', staffController.getStaffById);

router.post('/',  validate.addStaffInfo, staffController.addStaff);

router.put('/:id', validate.updateStaffInfo, staffController.updateStaffById);

router.delete('/:id', staffController.deleteStaffById);


module.exports = router;
