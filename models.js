const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    done : Boolean,
    string : String
})

module.exports = toDoSchema