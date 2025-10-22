import express from "express"
import cors from "cors"
import { connectMongo } from "./mongo.js"
import { router,listenToApi } from "./routes.js"
import dotenv  from "dotenv"

const app = express();
app.use(express.json());

dotenv.config();

app.use(cors({
    origin: process.env.ORIGIN
}));


await connectMongo()

app.listen(process.env.PORT, () => {
    console.log(`Server Listening on PORT: ${process.env.PORT}`);
});
app.use('/x',router)
listenToApi();
