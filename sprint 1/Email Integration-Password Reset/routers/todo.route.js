
const express = require('express');
const checkToken = require('../middleware/auth.middleware');
const TodoModel = require('../models/todoModel');
const todoRouter = express.Router();


//  Add todo
//                                Always pass the role in array only
todoRouter.post('/add-todo', checkToken(["user"]), async (req, res) => {

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

todoRouter.get('/see', checkToken(["user"]), async (req, res) => {
    const userId = req.user
    try {

        console.log("seeee todo");

        const myTodo = await TodoModel.find({ userId });
        res.status(200).json({ myTodo })


    } catch (error) {

        res.status(500).json({ msg: "Internal server error ! " })

    }
})




module.exports = todoRouter;