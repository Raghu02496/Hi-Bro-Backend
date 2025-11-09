import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gameRouter from "./routes/game.routes.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import connectMongo  from "./mongo.js"
import authMiddleware from "./middleware.js"
import http from "http"
import { Server } from "socket.io"
import socketMiddleware from "./socket.middleware.js"
import socketSetup from "./socketSetup.js"

dotenv.config();

const app = express();

app.use(
    express.json(),
    cookieParser(),
    cors({
        origin: process.env.ORIGIN,
        credentials: true
    })
);

const server = http.createServer(app)
const io = new Server(server,{ cors: { origin: process.env.ORIGIN, credentials: true } })

io.use(socketMiddleware);
socketSetup(io);

await connectMongo()

server.listen(process.env.PORT, () => {
    console.log(`Server Listening on PORT: ${process.env.PORT}`);
});

app.use('/protected',authMiddleware,gameRouter);
app.use('/public',authRouter)