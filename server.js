const express = require('express');
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.listen(3000, () => {
    console.log("Server Listening on PORT: 3000");
});

app.get('/status',(request,response)=>{
    console.log('request recieved');
    response.json({ok : true , data : "Everything ok nigga"})
})