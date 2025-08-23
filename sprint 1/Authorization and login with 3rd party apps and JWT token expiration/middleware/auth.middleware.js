
var jwt = require('jsonwebtoken');

const checkToken = (role) => {

    return (req, res, next) => {
        console.log("I am middleware")
        try {
            const getToken = req.headers.authorization;

            if (getToken) {

                const token = getToken.split(" ")[1];

                var decoded = jwt.verify(token, process.env.JWT_TOKEN);
                // if decode working fine which means we verify the token
                // we are getting userId and role from decoded  =>  decoded.userId  & decoded.role
                //  
                console.log(decoded)
                
                if (decoded) {
                             //    we pass role in array that's why we conform role by using includes method in array....
                    if (role.includes(decoded.role)) {
                        req.user = decoded.userId
                        console.log("USER ID  :   " , decoded.userId)
                        next();
                    } else {
                        res.status(403).json({ msg: "You are not allowed to perform this operation..." })
                    }
                } else {
                    res.status(403).json({ msg: "login fail plz login again !", error })
                }


            } else {
                res.status(401).json({ msg: "Unauthorized", error })
            }

        } catch (error) {

            res.status(404).json({ msg: "Server Error", error })

        }


    };

}  //  checkToken


module.exports = checkToken;