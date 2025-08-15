


const express = require('express');
const courseModel = require('../models/courseModel');
const enrollmentModel = require('../models/enrollmentModel');

const courseRouter = express.Router();

courseRouter.post('/add-course', async (req, res) => {
    const newCourse = req.body;

    try {

        await courseModel.create(newCourse)

        res.status(201).json({ msg: "New course Added", newCourse })

    } catch (error) {

        res.status(500).json({ msg: "Internal Server Error", error })

    }
})

 // SoftDelete course
courseRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

     // soft delete will be apply
     // isDelete will be true in course document
     // isActive will fe false for all enrollments where this courseId is present


    try {

        let course = await courseModel.findById(id);
        course.isDelete = true;
        await course.save();

        await enrollmentModel.updateMany({courseId : id}, {$set:{isActive : false}})

         res.status(200).json({msg : "Course Deleted ! "})

    } catch (error) {

        res.status(500).json({ msg: "Internal Server Error", error })

    }
})

module.exports = courseRouter;