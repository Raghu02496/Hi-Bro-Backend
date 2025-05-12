const mongoose = require('mongoose');

function connectMongo(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost:27017/todo').then(()=>{
            resolve()
            console.log('connected to mongodb');
        })
    })
}

module.exports = connectMongo

