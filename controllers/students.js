const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId

//getAll Student
const getAllStudents = async(req, res) => {
     //#swagger tags =['staff']
    const result = await mongodb.getDatabase().db().collection("students").find();
    result.toArray().then((students) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(students);
    });
};

//getSingle student by id
const getStudentById = async(req, res) => {
     //#swagger tags =['staff']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id.');
    } 
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("students").find({ _id: studentId});
    if (!result) {
      throw createError(404, 'Student does not exist');
    }
    result.toArray().then((students) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(students[0]);
    });
};

//Add Student Info
const addStudent = async (req, res) => {
     //#swagger tags =['students']
    const students = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDay: req.body.birthDay,
        email: req.body.email,
        department: req.body.department,
        enrollmentDate: req.body.enrollmentDate,
        completionYear: req.body.completionYear,
        tuition: req.body.tuition,
        club: req.body.club,
        function: req.body.function,
        courses: req.body.courses
    };
    const response = await mongodb.getDatabase().db().collection('students').insertOne(students);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding student.');
    }
};

//Update student Info
const updateStudentById = async (req, res) => {
     //#swagger tags =['staff']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update student Info.');
    }
    const studentId = new ObjectId(req.params.id);
    const students = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDay: req.body.birthDay,
        email: req.body.email,
        department: req.body.department,
        enrollmentDate: req.body.enrollmentDate,
        completionYear: req.body.completionYear,
        tuition: req.body.tuition,
        club: req.body.club,
        function: req.body.function,
        courses: req.body.courses
    };
    const response = await mongodb
      .getDatabase().db().collection('students').replaceOne({ _id: studentId }, students);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating student Info.');
    }
};

//Delete student Info
const deleteStudentById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete student.');
  }
  const studentId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting student.');
  }
};


module.exports = {getAllStudents, getStudentById, addStudent, updateStudentById, deleteStudentById};