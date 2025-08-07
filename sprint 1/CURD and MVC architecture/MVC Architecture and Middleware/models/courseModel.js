
const fs = require('fs');

const getData = () => {
    const allCourses = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
    return {allCourses}
}

const setData = (data) => {
    if(!data){
       return "Plz add details in course" 
    }else{
        const allCourses = (fs.writeFileSync('./db.json', JSON.stringify(data)));
        return "Course was successfully ADDED"
    }
    
}


module.exports = {getData, setData};