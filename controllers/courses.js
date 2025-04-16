const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId

//getAll Courses
const getAllCourses = async(req, res) => {
     //#swagger tags =['courses']
  const result = await mongodb.getDatabase().db().collection("courses").find();
  try {
    result.toArray().then((courses) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(courses);
    });
  }catch (error){
    console.error('Error retrieving courses:', error);
    res.status(500).json('An error occurred while retrieving courses');
  }
};

//get course
const getCourseById = async(req, res) => {
    //#swagger tags =['course']
  if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid id.');
  } 
  try {
    const courseId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("courses").find({ _id: courseId});
    if (!result) {
      throw createError(404, 'Course does not exist');
    }
    result.toArray().then((courses) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(courses[0]);
    });
  }catch (error){
    console.error('Error retrieving course:', error);
    res.status(500).json('An error occurred while retrieving course');
  }
};

//Add Course
const addCourse = async (req, res) => {
     //#swagger tags =['Course']
  const course = {
    subject: req.body.subject,
    department: req.body.department,
    creditScore: req.body.creditScore,
    passMark: req.body.passMark,
    courseLoad: req.body.courseLoad,
    instructorFirstName: req.body.instructorFirstName,
    instructorLastName: req.body.instructorLastName,
    email: req.body.email,
    teachingAssistant: req.body.teachingAssistant,
  };
  try {
    const response = await mongodb.getDatabase().db().collection('reports').insertOne(course);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while adding course.');
    }
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json('An error occurred while adding course');
  }
};

//Update course BY Id
const updateCourse = async (req, res) => {
    //#swagger tags =['course']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update course.');
  }
  const courseId = new ObjectId(req.params.id);
  const course = {
      subject: req.body.subject,
      department: req.body.department,
      creditScore: req.body.creditScore,
      passMark: req.body.passMark,
      courseLoad: req.body.courseLoad,
      instructorFirstName: req.body.instructorFirstName,
      instructorLastName: req.body.instructorLastName,
      email: req.body.email,
      teachingAssistant: req.body.teachingAssistant,
  };
  try {
    const response = await mongodb
    .getDatabase().db().collection('courses').replaceOne({ _id: courseId }, course);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating course.');
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json('An error occurred while updating course');
  }
};
//Delete course By Id
const deleteCourse = async (req, res) => {
    //#swagger tags =['Course']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete course.');
  }
  try{
    const courseId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ _id: courseId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting course.');
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json('An error occurred while deleting course');
  }
};


module.exports = {getAllCourses, getCourseById, addCourse, updateCourse, deleteCourse};