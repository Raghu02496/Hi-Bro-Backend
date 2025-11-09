import express from "express"
import { listUsers } from "../controllers/chat.controllers.js";

const chatRouter = express.Router();

chatRouter.post('/listUsers',listUsers)

export default chatRouter