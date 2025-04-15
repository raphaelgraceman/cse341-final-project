const express = require('express');
const router = require('express').Router();
const studentController = require('../controllers/students');
const validate = require('../middlewares/students');

//Route for students info
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', validate.addStudent, studentController.addStudent);
router.put('/:id',  validate.updateStudentInfo, studentController.updateStudentById);
router.delete('/:id', studentController.deleteStudentById);




module.exports = router;
