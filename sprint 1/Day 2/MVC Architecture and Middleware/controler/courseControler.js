const { getData, setData } = require("../models/courseModel");

const getAllCourse = (req, res) => {
    // const allCourses = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    // console.log(allCourses);

    const courses = getData().allCourses.courses;
    console.log(courses)

    res.status(200).json({ msg: "All courses are", courses })
}


const getCourseById =  (req, res) => {
    const id = req.params.id;
    console.log(id);

    // const allCourses = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    const arr = getData().allCourses.courses;

    const Index = arr.findIndex((ele) => ele.id == id);

    if (Index == -1) {
        res.status(404).json({ msg: "Targeted course not found !" })
    } else {
        const element = arr.filter((ele) => ele.id == id)

        res.status(200).json({ msg: "Targeted course", course: element })
    }

}

const addCourse = (req, res) => {
    const newCourse = req.body;
    const obj = getData().allCourses;;
    const courses =  obj.courses;
    courses.push(newCourse);
    obj.courses = courses;

    console.log(courses);

    setData(obj)

    res.status(201).json({ msg: "Successfully Added !" })
}

module.exports = {addCourse, getCourseById, getAllCourse}