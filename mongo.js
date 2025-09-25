const mongoose = require('mongoose');
const toDoSchema = require('./models');

function connectMongo(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost:27017/todo').then(()=>{
            resolve()
            console.log('connected to mongodb');
        })
    })
}
const TodoModel = mongoose.model('todo',toDoSchema,'todo_collection');
module.exports = {connectMongo,TodoModel}

