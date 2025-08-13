

const express = require('express');
const studentModel = require('../models/studentModel');

const studentRouter = express.Router();

studentRouter.post('/add-student',async (req, res) => {
    const newStudent = req.body;
console.log(newStudent)
    try {

        await studentModel.create(newStudent)

        res.status(201).json({msg : "New student Added", newStudent})
        
    } catch (error) {
        
         res.status(500).json({msg : "Internal Server Error", error})

    }
})



module.exports = studentRouter;