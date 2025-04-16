const express = require('express');
const router = require('express').Router();
const studentController = require('../controllers/students');
const validate = require('../middlewares/students');
const {isAuthenticated} = require('../middlewares/authenticate');

//Route for students info
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', isAuthenticated, validate.addStudent, studentController.addStudent);
router.put('/:id', isAuthenticated, validate.updateStudentInfo, studentController.updateStudentById);
router.delete('/:id', isAuthenticated, studentController.deleteStudentById);




module.exports = router;
