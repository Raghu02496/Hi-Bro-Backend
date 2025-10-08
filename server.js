const express = require('express');
const cors = require('cors')
const mongo = require('./mongo')
const routes = require('./routes')

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:9001'
}));

mongo.connectMongo().then(()=>{
    app.listen(3000, () => {
        console.log("Server Listening on PORT: 3000");
    });
    app.use('/todo',routes.router)
    routes.listenToApi();
});
