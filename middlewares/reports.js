const validator = require('../helpers/validator');

const addReport = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "enrollmentDate": "required|date",
    "completionYear": "date",
    "term": "required|string",
    "coreMaths": "required|number",
    "science": "required|number",
    "english": "required|number",
    "rme": "required|number"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Your request failed, check data. ',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateReport = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "enrollmentDate": "required|date",
    "completionYear": "date",
    "term": "required|string",
    "coreMaths": "required|number",
    "science": "required|number",
    "english": "required|number",
    "rme": "required|number"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
    addReport, updateReport
};
