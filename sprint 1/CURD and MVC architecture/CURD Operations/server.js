
const express = require('express');

const app = express();
const fs = require('fs');

app.use(express.json()); // sense json data and convert into parse


app.get('/test', (req, res) => {
    res.status(200).json({ msg: "test route working successfully !" })
})

app.get('/courses', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;
    res.status(200).json({ msg: "Course list are ", courses })
    // console.log(data)
})

app.post('/add-course', (req, res) => {
    let newCourse = req.body;
    console.log(newCourse)
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;
    courses.push(newCourse);
    fs.writeFileSync('./db.json', JSON.stringify(data))
    res.status(201).json({ msg: "Course was Added successfully !" })
})

app.put("/update-course/:id", (req, res) => {
    let id = req.params.id;
    // console.log(id)
    // id it is a params || path parameter and when we put :id then it was dynamic in nature
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;

    let index = courses.findIndex((ele) => ele.id == id);
    console.log(index)
    if (index == -1) {
        res.status(204).json({ msg: "Data not found in DataBase !" })
    } else {
        let updatedCourses = courses.map((ele) => {
            if (ele.id == id) {
                return { ...ele, ...req.body }
            } else {
                return ele;
            }

        })
        data.courses = updatedCourses;

        fs.writeFileSync('./db.json', JSON.stringify(data))

        res.status(201).json({ msg: "Course update Successfully !" })

    } // else


})

app.delete("/delete-course/:id", (req, res) => {
    let id = req.params.id;
    // console.log(id)
    // id it is a params || path parameter and when we put :id then it was dynamic in nature
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    let courses = data.courses;

    let index = courses.findIndex((ele) => ele.id == id);
    // console.log(index)
    if (index == -1) {
        res.status(204).json({ msg: "Course not found in DataBase !" })
    } else {
        let updatedCourses = courses.filter((ele) => {
            if (ele.id != id) {
                return ele;
            }
        })
        data.courses = updatedCourses;

        fs.writeFileSync('./db.json', JSON.stringify(data))

        res.status(200).json({ msg: "Course Delete Successfully !" })

    } // else


})

//  query parameters are remaining to code


app.listen(3000, () => {
    console.log("Server was started on PORT No. 3000");
})




















