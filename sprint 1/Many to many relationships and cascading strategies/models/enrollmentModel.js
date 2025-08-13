

const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
    {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
        isActive : {type : Boolean, default : true}
    }
);

const enrollmentModel = mongoose.model("enrollment", enrollmentSchema);


module.exports = enrollmentModel;
