function listenToApi(app){
    app.get('/status',(request,response)=>{
        response.json({ok : true , data : "Everything ok nigga"})
    })
    
    app.post('/info',(request,response)=>{
        response.json({ok:true , data : request.body})
    })
}

module.exports = listenToApi