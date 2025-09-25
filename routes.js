const express = require('express');
const router = express.Router();
const mongo = require('./mongo')

function listenToApi(){
    router.get('/status',(request,response)=>{
        response.json({ok : true , data : "Everything ok"})
    })

    router.post('/addTodo',(request,response)=>{
        const {done, string } = request.body;

        try{
            const todo = new mongo.TodoModel({string : string ,done : done})
            todo.save();
            response.json({ok : true , msg : 'todo added'})
        }catch(error){
            response.status(500).json({ok : false , error : error})
        }
    })

    router.post('/getTodo',async (request,response)=>{
        const {limit, page } = request.body;
        
        try{
            const todos = await mongo.TodoModel.find().skip(parseInt(limit*page)).limit(parseInt(limit));
            response.json({ok : true , todo : todos })
        }catch(error){
            response.status(500).json({ok : false , error : error})
        }
    })

}

module.exports = {listenToApi,router}