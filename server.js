const express = require('express');
const cors = require('cors')
const connectMongo = require('./connectMongo')
const apiListeners = require('./routes')

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

connectMongo().then(()=>{
    app.listen(3000, () => {
        console.log("Server Listening on PORT: 3000");
    });
    
    apiListeners(app);
});
