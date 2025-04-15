const validator = require('../helpers/validator');

const addStaffInfo = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "appointmentDate": "required|date",
    "terminationDate": "",
    "qualification": "required|string",
    "salary": "",
    "function": "required|string",
    "course": ""
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

const updateStaffInfo = (req, res, next) => {
  const validationRule = {
    "firstName": "required|string",
    "lastName": "required|string",
    "birthDay": "required|date",
    "email": "required|email",
    "department": "required|string",
    "appointmentDate": "required|date",
    "terminationDate": "",
    "qualification": "required|string",
    "salary": "",
    "function": "required|string",
    "course": ""
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
  addStaffInfo, updateStaffInfo
};
