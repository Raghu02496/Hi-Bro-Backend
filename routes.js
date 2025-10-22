import express from "express"
import { msgChatGpt, getConversation, generateCase, getCaseById, sendStatus } from "./controllers.js"

export const router = express.Router();

export function listenToApi(){
    router.post('/status',sendStatus)
    router.post('/msgChatGpt',msgChatGpt)
    router.post('/getConversation',getConversation)
    router.post('/generateCase',generateCase)
    router.post('/getCaseById',getCaseById)
}