

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isDelete : {type : Boolean, default : false}
    }
);

//  pre hook for cascading methods :
courseSchema.pre("save", async function(next){

    console.log("I am pre hook from mongoose");

    // await enrollmentModel.updateMany({courseId : id}, {$set:{isActive : false}})  // we can also write herr

    next();
})

//  post hook for cascading methods :

courseSchema.post ("save", async function(){

    console.log("I am post hook from mongoose");

    // await enrollmentModel.updateMany({courseId : id}, {$set:{isActive : false}})  // we can also write herr

})



const courseModel = mongoose.model("courses", courseSchema);


module.exports = courseModel;
