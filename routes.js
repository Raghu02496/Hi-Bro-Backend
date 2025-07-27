const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')
const toDoSchema = require('./models')

function listenToApi(app){
    app.get('/status',(request,response)=>{
        response.json({ok : true , data : "Everything ok"})
    })

    app.post('/getCat',(request,response)=>{
        const filePath = path.join(__dirname, 'files', 'cat.jpg');
        const readStream = fs.createReadStream(filePath);
        response.setHeader('Content-Type', 'image/jpeg');
        readStream.pipe(response);
    })

    app.post('/addTodo',(request,response)=>{
        const {done, string } = request.body;

        try{
            const TodoModel = mongoose.model('todo',toDoSchema,'todo_collection');
            const todo = new TodoModel({string : string ,done : done})
            todo.save();
            response.json({ok : true , msg : 'todo added'})
        }catch(error){
            response.status(500).json({ok : false , error : error})
        }
    })

    app.post('/getTodo',async (request,response)=>{
        const {limit, page } = request.body;
        
        try{
            const TodoModel = mongoose.model('todo',toDoSchema,'todo_collection');
            const todos = await TodoModel.find().skip(parseInt(limit*page)).limit(parseInt(limit));
            response.json({ok : true , todo : todos })
        }catch(error){
            response.status(500).json({ok : false , error : error})
        }
    })

}

module.exports = listenToApi