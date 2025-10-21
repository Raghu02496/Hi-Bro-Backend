import express from "express"
import { msgChatGpt,getConversation,generateCase,getCaseById } from "./controllers.js"

export const router = express.Router();

export function listenToApi(){
    router.post('/msgChatGpt',msgChatGpt)
    router.post('/getConversation',getConversation)
    router.post('/generateCase',generateCase)
    router.post('/getCaseById',getCaseById)
}