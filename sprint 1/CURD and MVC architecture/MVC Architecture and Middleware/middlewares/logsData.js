
const fs = require('fs');

const logsData = (req, res, next) => {
        let data = `Method : ${req.method} | EndPoint : ${req.url} \n`;
        fs.appendFileSync('./logs.txt', data);
        next()
}


module.exports = logsData;