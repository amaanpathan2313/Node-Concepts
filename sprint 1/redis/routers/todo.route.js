
const express = require('express');
const checkToken = require('../middleware/auth.middleware');
const TodoModel = require('../models/todoModel');
const redis = require('../configs/redis.configs');
const todoRouter = express.Router();


//  Add todo

todoRouter.post('/add-todo', checkToken, async (req, res) => {

    const newTodo = req.body;
    const userId = req.user;      ///  get userId from Auth middleware


    try {

        const addTodo = await TodoModel.create({ ...newTodo, userId })
        res.status(200).json({ msg: "Task Added", addTodo })

    } catch (error) {

        res.status(500).json({ msg: "Server error !", error })
    }

})



// get todo

//  Caching is applied to this route 

todoRouter.get('/see', checkToken, async (req, res) => {
    const userId = req.user
    try {
        // check data is present in redis  
        //  If yes then send the response through redis data
        //  else get data from Data base store in redis then send that data to user 
        // Redis store data in key value pair os use userId as a key 

        let cachedData = await redis.get(userId);

        if (!cachedData) {
            // Data not stored in redis
            const myTodo = await TodoModel.find({ userId });

            redis.set(userId, JSON.stringify(myTodo), "EX", 10) // 10 seconds 10 second expiry  

            res.status(200).json({msg : "To do List from Data Base",  myTodo })

        }else{
            const myTodo = JSON.parse(cachedData)

            res.status(200).json({msg : "To do List from redis",  myTodo })

        }


    } catch (error) {

        res.status(500).json({ msg: "Internal server error ! " })

    }
})




module.exports = todoRouter;