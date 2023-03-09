const express = require("express");
const User = require("./models/user");
const Todo = require("./models/to-do");
const { ObjectId } = require('mongodb');

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({
      username,
      password,
    });
    const exists = await User.findOne({ username }).exec();
    console.log(exists)
    if (exists) {
      console.log('executing')
      return res.status(401).json({
        message: "User Already signed up login to access TODOs",
        error: err.message,
        statusCode: 401,
      });
    }
    console.log("after exists")

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(401).json({
      message: "Error creating user",
      error: err.message,
      statusCode: 401,
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.status(401).json({ message: "User not found", statusCode: 401 });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password", statusCode: 401});
    }

    return res.json({
      user: { username: user.username, _id: user._id },
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in",
      error: err.message,
      statusCode: 401,
    });
  }
});

router.get("/todos/:userId", async (req, res) => {
  try {
    const todos = await Todo.find({}).exec();
    userObject = new ObjectId(req.params.userId)
    const todoList = todos.filter((item) => {
      if (userObject.equals(item.userId))
        return true;
    })
    return res.json(todoList);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching todos",
      error: err.message,
    });
  }
});

router.post("/addTodo", async (req, res) => {
  const { title, description, completed , userId} = req.body;

  const todo = new Todo({
    title,
    description,
    completed,
    userId,
  });

  try {
    await todo.save();
    return res.status(201).json({ message: "Todo created successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error creating todo",
      error: err.message,
    });
  }
});

router.put("/editTodo/:id", async (req, res) => {
  const { title, description, completed, userId } = req.body;
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      userId: userId,
    }).exec();

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.completed = completed ;

    await todo.save();

    return res.json({ message: "Todo updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error updating todo",
      error: err.message,
    });
  }
});

router.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting todo",
      error: err.message,
    });
  }
});

module.exports = router;
