const express = require('express')
const router = express.Router();
let Todo = require('../models/todo.model');

//list all todos from database
router.get('/list', (req, res) => {
    Todo.find()
    .then( todos => res.json(todos))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//get todo with id from database
router.get('/find/:id', (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

//create new todo
router.post('/create', (req, res) => {
    let newTodo = new Todo(req.body);
    newTodo.save()
    .then( todo => res.status(200).json(`Todo created: ${todo}`))
    .catch(err => res.status(400).json(`Error: ${err}`))
});

//update todo
router.post('/update/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then( todo => res.status(200).json(`Todo created: ${todo}`))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//delete todo
router.delete('/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(() => { 'Todo deleted.' })
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router;