const express = require('express');
const router = express.Router();
const controllers = require('./controllers')

function listenToApi(){
    router.post('/status',controllers.sendStatus)
    router.post('/addTodo',controllers.addTodo)
    router.post('/getTodo',controllers.getTodo)
    router.post('/updateTodoById',controllers.updateTodoById)
    router.post('/deleteTodoById',controllers.deleteTodoById)
}

module.exports = {listenToApi,router}