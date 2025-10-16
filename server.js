const express = require('express');
const cors = require('cors')
const mongo = require('./mongo')
const routes = require('./routes')
const dotenv = require('dotenv')

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:9001'
}));

dotenv.config();

mongo.connectMongo().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server Listening on PORT: ${process.env.PORT}`);
    });
    app.use('/todo',routes.router)
    routes.listenToApi();
});
