const express = require('express');
const router = require('express').Router();
const courseController = require('../controllers/courses');
const validate = require('../middlewares/courses');
const {isAuthenticated} = require('../middlewares/authenticate');

//Routes for expenses info
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', isAuthenticated, validate.addCourseInfo, courseController.addCourse);
router.put('/:id', isAuthenticated, validate.updateCourseInfo, courseController.updateCourse);
router.delete('/:id', isAuthenticated, courseController.deleteCourse);




module.exports = router;
