import express from "express"
import { login, logout } from "../controllers.js";

const authRouter = express.Router();

authRouter.post('/login',login)
authRouter.post('/logout',logout)

export default authRouter