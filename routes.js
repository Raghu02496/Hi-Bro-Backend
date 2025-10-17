import express from "express"
import { sendStatus,addTodo,getTodo,updateTodoById,deleteTodoById,msgChatGpt } from "./controllers.js"

export const router = express.Router();

export function listenToApi(){
    router.post('/status',sendStatus)
    router.post('/addTodo',addTodo)
    router.post('/getTodo',getTodo)
    router.post('/updateTodoById',updateTodoById)
    router.post('/deleteTodoById',deleteTodoById)
    router.post('/msgChatGpt',msgChatGpt)
}