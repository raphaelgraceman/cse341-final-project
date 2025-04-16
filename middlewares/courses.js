const validator = require('../helpers/validator');

const addCourseInfo = (req, res, next) => {
  const validationRule = {
    "subject": "required|string",
    "department": "required|string",
    "creditScore": "required|number",
    "passMark": "required|number",
    "courseLoad": "required|string",
    "instructorFirstName": "required|string",
    "instructorLastName": "required|string",
    "email": "required|email",
    "teachingAssistant": "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Your request failed upon validation ',
        data: err
      });
    } else {
      next();
    }
  });
};

const updateCourseInfo = (req, res, next) => {
  const validationRule = {
    "subject": "required|string",
    "department": "required|string",
    "credit Score": "required|number",
    "passMark": "required|number",
    "courseLoad": "required|string",
    "instructorFirstName": "required|string",
    "instructorLastName": "required|string",
    "email": "required|email",
    "teachingAssistant": "required|string"
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
    addCourseInfo, updateCourseInfo
};
