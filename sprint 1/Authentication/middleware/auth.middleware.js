
var jwt = require('jsonwebtoken');



const checkToken = (req, res, next) => {
console.log("I am middleware")
    try {
        const getToken = req.headers.authorization;

        if (getToken) {

            const token = getToken.split(" ")[1];

            var decoded = jwt.verify(token, process.env.JWT_TOKEN);
            // if decode working fine which means we verify the token
            
            if(decoded){
                console.log(decoded) 
                req.user = decoded.userId;
                next();
            }else{
                res.status(403).json({ msg: "login fail plz login again !", error })
            }

            
        } else {
            res.status(500).json({ msg: "Unauthorized", error })
        }

    } catch (error) {

        res.status(500).json({ msg: "Server Error", error })

    }


};


module.exports = checkToken;