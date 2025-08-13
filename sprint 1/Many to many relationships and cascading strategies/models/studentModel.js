
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
       
    }
);

const studentModel = mongoose.model("students", studentSchema);


module.exports = studentModel;
