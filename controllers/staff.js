const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId

//getAll Staff
const getAllStaff = async(req, res) => {
     //#swagger tags =['staff']
    const result = await mongodb.getDatabase().db().collection("staff").find();
    result.toArray().then((staff) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(staff);
    });
};

//getSingle staff by id
const getStaffById = async(req, res) => {
     //#swagger tags =['staff']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id.');
    } 
    const staffId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("staff").find({ _id: staffId});
    if (!result) {
      throw createError(404, 'Staff does not exist');
    }
    result.toArray().then((staff) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(staff[0]);
    });
};

//Add Staff Info
const addStaff = async (req, res) => {
     //#swagger tags =['staff']
    const staff = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDay: req.body.birthDay,
        email: req.body.email,
        department: req.body.department,
        appointmentDate: req.body.appointmentDate,
        terminationDate: req.body.terminationDate,
        qualification: req.body.qualification,
        salary: req.body.salary,
        function: req.body.function,
        course: req.body.course
    };
    const response = await mongodb.getDatabase().db().collection('staff').insertOne(staff);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while Adding staff.');
    }
};

//Update staff Info
const updateStaffById = async (req, res) => {
     //#swagger tags =['staff']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id to update staff Info.');
    }
    const staffId = new ObjectId(req.params.id);
    const staff = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDay: req.body.birthDay,
        email: req.body.email,
        department: req.body.department,
        appointmentDate: req.body.appointmentDate,
        terminationDate: req.body.terminationDate,
        qualification: req.body.qualification,
        salary: req.body.salary,
        function: req.body.function,
        course: req.body.course
    };
    const response = await mongodb
      .getDatabase().db().collection('staff').replaceOne({ _id: staffId }, staff);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating staff Info.');
    }
};

//Delete delete staff Info
const deleteStaffById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete staff.');
  }
  const staffId = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('staff').deleteOne({ _id: staffId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting staff.');
  }
};


module.exports = {getAllStaff, getStaffById, addStaff, updateStaffById, deleteStaffById};