const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId

//getAll Reports
const getAllReports = async(req, res) => {
     //#swagger tags =['reports']
  const result = await mongodb.getDatabase().db().collection("reports").find();
  try {
    result.toArray().then((reports) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(reports);
    });
  }catch (error){
    console.error('Error retrieving reports:', error);
    res.status(500).json('An error occurred while retrieving reports');
  }
};

//getSingle report
const getReportById = async(req, res) => {
    //#swagger tags =['reports']
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id.');
  } 
  try {
    const reportsId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("reports").find({ _id: reportsId});
    if (!result) {
      throw createError(404, 'Reports does not exist');
    }
    result.toArray().then((reports) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(reports[0]);
    });
  }catch (error){
    console.error('Error retrieving reports:', error);
    res.status(500).json('An error occurred while retrieving reports');
  }
};

//Add Reports
const addReports = async (req, res) => {
     //#swagger tags =['reports']
  const reports = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDay: req.body.birthDay,
    email: req.body.email,
    department: req.body.department,
    enrollmentDate: req.body.enrollmentDate,
    completionYear: req.body.completionYear,
    term: req.body.term,
    coreMaths: req.body.coreMaths,
    science: req.body.science,
    english: req.body.english,
    rme: req.body.rme
  };
  try {
    const response = await mongodb.getDatabase().db().collection('reports').insertOne(reports);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding reports.');
    }
  } catch (error) {
    console.error('Error adding reports:', error);
    res.status(500).json('An error occurred while adding reports');
  }
};

//Update reports BY Id
const updateReports = async (req, res) => {
    //#swagger tags =['reports']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update reports.');
  }
  const reportsId = new ObjectId(req.params.id);
  const reports = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDay: req.body.birthDay,
    email: req.body.email,
    department: req.body.department,
    enrollmentDate: req.body.enrollmentDate,
    completionYear: req.body.completionYear,
    term: req.body.term,
    coreMaths: req.body.coreMaths,
    science: req.body.science,
    english: req.body.english,
    rme: req.body.rme
  };
  try {
    const response = await mongodb
    .getDatabase().db().collection('reports').replaceOne({ _id: reportsId }, reports);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating reports.');
    }
  } catch (error) {
    console.error('Error updating reports:', error);
    res.status(500).json('An error occurred while updating reports');
  }
};
//Delete reports By Id
const deleteReports = async (req, res) => {
    //#swagger tags =['Reports']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete reports.');
  }
  try{
    const reportsId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('reports').deleteOne({ _id: reportsId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting reports.');
    }
  } catch (error) {
    console.error('Error deleting reports:', error);
    res.status(500).json('An error occurred while deleting reports');
  }
};


module.exports = {getAllReports, getReportById, addReports, updateReports, deleteReports};