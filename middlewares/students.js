const validator = require('../helpers/validator');

const addStudent = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "enrollmentDate": "required|date",
    "completionYear": "date",
    "tuition": "required|string",
    "club": "required|string",
    "function": "required|string",
    "courses": "required|string"
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

const updateStudentInfo = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "enrollmentDate": "required|date",
    "completionYear": "date",
    "tuition": "string",
    "club": "string",
    "function": "required|string",
    "courses": "string"
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
  addStudent, updateStudentInfo
};
