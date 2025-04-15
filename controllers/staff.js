const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId

//getAll Staff
const getAllStaff = async(req, res) => {
    //#swagger tags =['staff']
  try{
  const result = await mongodb.getDatabase().db().collection("staff").find();
  result.toArray().then((staff) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(staff);
  });
  }catch (error){
    console.error('Error retrieving staff data:', error);
    res.status(500).json('An error occurred while retrieving staff info');
  }
};

//getSingle staff by id
const getStaffById = async(req, res) => {
    //#swagger tags =['staff']
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id.');
  } 
  try{
    const staffId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("staff").find({ _id: staffId});
    if (!result) {
      throw createError(404, 'Staff does not exist');
    }
    result.toArray().then((staff) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(staff[0]);
    });
  }catch (error){
    console.error('Error retrieving staff data:', error);
    res.status(500).json('An error occurred while retrieving staff info');
  }
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
  try {
    const response = await mongodb.getDatabase().db().collection('staff').insertOne(staff);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while Adding staff.');
    }
  } catch (error) {
    console.error('Error adding staff info:', error);
    res.status(500).json('An error occurred while adding staff info');
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
   try{
    const response = await mongodb
    .getDatabase().db().collection('staff').replaceOne({ _id: staffId }, staff);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating staff Info.');
    }
  } catch (error) {
    console.error('Error updating staff info:', error);
    res.status(500).json('An error occurred while updating staff info');
  }
};

//Delete delete staff Info
const deleteStaffById = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete staff.');
  }
  try {
    const staffId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('staff').deleteOne({ _id: staffId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting staff.');
    }
  } catch (error) {
    console.error('Error deleting staff info:', error);
    res.status(500).json('An error occurred while deleting staff info');
  }
};


module.exports = {getAllStaff, getStaffById, addStaff, updateStaffById, deleteStaffById};