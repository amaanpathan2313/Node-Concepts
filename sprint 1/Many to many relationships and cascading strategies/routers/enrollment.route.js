



const express = require('express');
const courseModel = require('../models/courseModel');
const enrollmentModel = require('../models/enrollmentModel');

const enrollmenteRouter = express.Router();

enrollmenteRouter.post('/add-enrollment', async (req, res) => {
    const newEnrollment = req.body;

    try {

        await enrollmentModel.create(newEnrollment)

        res.status(201).json({ msg: "Enrollment Successful" })

    } catch (error) {

        res.status(500).json({ msg: "Internal Server Error", error })

    }
})

enrollmenteRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        //                                                                         
        const enroll = await enrollmentModel.findById(id).populate("courseId", { _id: 0 }).populate("studentId", { name: 1, _id: 0 });

        res.status(200).json({ enroll })

    } catch (error) {

        res.status(500).json({ msg: "Server error", error })

    }
})



module.exports = enrollmenteRouter;