import express from "express"
import { msgChatGpt,getConversation,generateCase } from "./controllers.js"

export const router = express.Router();

export function listenToApi(){
    router.post('/msgChatGpt',msgChatGpt)
    router.post('/getConversation',getConversation)
    router.post('/generateCase',generateCase)
}