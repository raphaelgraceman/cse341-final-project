const express = require('express');
const router = require('express').Router();
const reportsController = require('../controllers/reports');
const validate = require('../middlewares/reports');
const {isAuthenticated} = require('../middlewares/authenticate');

//Routes for expenses info
router.get('/', reportsController.getAllReports);
router.get('/:id', reportsController.getReportById);
router.post('/', isAuthenticated, validate.addReport, reportsController.addReports);
router.put('/:id', isAuthenticated, validate.updateReport, reportsController.updateReports);
router.delete('/:id', isAuthenticated, reportsController.deleteReports);




module.exports = router;
