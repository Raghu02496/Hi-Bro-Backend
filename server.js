import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gameRouter from "./routes/game.routes.js"
import authRouter from "./routes/auth.routes.js"
import { connectMongo } from "./mongo.js"
import { authMiddleware } from "./middleware.js"
import cookieParser from "cookie-parser";

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

await connectMongo()

app.listen(process.env.PORT, () => {
    console.log(`Server Listening on PORT: ${process.env.PORT}`);
});

app.use('/protected',authMiddleware,gameRouter);
app.use('/public',authRouter)
