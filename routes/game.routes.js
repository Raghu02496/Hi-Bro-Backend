import express from "express"
import { msgChatGpt, getConversation, generateCase, getCaseById, sendStatus } from "../controllers/game.controllers.js"

export const gameRouter = express.Router();

gameRouter.post('/status',sendStatus)
gameRouter.post('/msgChatGpt',msgChatGpt)
gameRouter.post('/getConversation',getConversation)
gameRouter.post('/generateCase',generateCase)
gameRouter.post('/getCaseById',getCaseById)

export default gameRouter