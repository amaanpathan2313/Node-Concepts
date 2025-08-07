

const express = require('express');
 const { addCourse, getCourseById, getAllCourse } = require('../controler/courseControler');
const dataCheck = require('../middlewares/dataCheck');
 
const app = express();

const courseRoute = express.Router();  // It create sub route for course

// all data
courseRoute.get('/all-courses', getAllCourse)

// data by id
courseRoute.get('/courses-by/:id', getCourseById)

 

//add Data

//  we can use middleware in 2 type
// courseRoute.use(dataCheck)   //  Type 1

courseRoute.post('/add-course',dataCheck ,addCourse)   //  type 2   //  It is request Laval middleware

module.exports = courseRoute;









