import express from "express"
import cors from "cors"
import { connectMongo } from "./mongo.js"
import { router,listenToApi } from "./routes.js"
import dotenv  from "dotenv"

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:9001'
}));

dotenv.config();

await connectMongo()

app.listen(process.env.PORT, () => {
    console.log(`Server Listening on PORT: ${process.env.PORT}`);
});
app.use('/x',router)
listenToApi();
