const express = require('express');
const router = express.Router();
const controllers = require('./controllers')

function listenToApi(){
    router.post('/status',controllers.sendStatus)
    router.post('/addTodo',controllers.addTodo)
    router.post('/getTodo',controllers.getTodo)
}

module.exports = {listenToApi,router}