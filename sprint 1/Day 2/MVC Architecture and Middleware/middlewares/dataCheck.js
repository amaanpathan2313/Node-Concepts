
// Middleware  ===>  It is a special function that sit between request & response. It process the request if needed it can give the response or send handler to next process;
function dataCheck(req, res, next){
    const {title, id, teacher} = req.body;
    if(!title || !id || !teacher){
        res.status(406).json({msg : "wrong Request"})
    }else{
        next();   //  
    }
}


module.exports = dataCheck;