import express from "express"
import { msgChatGpt,getConversation } from "./controllers.js"

export const router = express.Router();

export function listenToApi(){
    router.post('/msgChatGpt',msgChatGpt)
    router.post('/getConversation',getConversation)
}