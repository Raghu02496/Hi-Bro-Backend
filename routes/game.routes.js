import express from "express"
import { msgChatGpt, getConversation, generateCase, getCaseById, listCases, sendStatus } from "../controllers/game.controllers.js"

export const gameRouter = express.Router();

gameRouter.post('/status',sendStatus)
gameRouter.post('/msgChatGpt',msgChatGpt)
gameRouter.post('/getConversation',getConversation)
gameRouter.post('/generateCase',generateCase)
gameRouter.post('/getCaseById',getCaseById)
gameRouter.post('/listCases',listCases)

export default gameRouter