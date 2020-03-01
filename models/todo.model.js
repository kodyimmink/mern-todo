const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
    todoDescription: {
        type: String,
        required: true,
    },
    todoResponsible: {
        type: String,
        required: true
    },
    todoPriority: {
        type: String,
        required: true
    },
    todoCompleted: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Todo', Todo);