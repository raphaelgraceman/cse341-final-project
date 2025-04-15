const validator = require('../helpers/validator');

const addStudent = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "enrollmentDate": "required|date",
    "completionYear": "",
    "tuition": "required",
    "club": "required",
    "function": "required|string",
    "courses": "required"
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
    "completionYear": "",
    "tuition": "",
    "club": "",
    "function": "required|string",
    "courses": ""
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
