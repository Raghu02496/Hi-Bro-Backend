const fs = require('fs');
const path = require('path');

function listenToApi(app){
    app.get('/status',(request,response)=>{
        response.json({ok : true , data : "Everything ok"})
    })
    
    app.post('/info',(request,response)=>{
        response.json({ok:true , data : request.body})
    })

    app.post('/getCat',(request,response)=>{
        const filePath = path.join(__dirname, 'files', 'cat.jpg');
        const readStream = fs.createReadStream(filePath);
        response.setHeader('Content-Type', 'image/jpeg');
        readStream.pipe(response);
    })
}

module.exports = listenToApi