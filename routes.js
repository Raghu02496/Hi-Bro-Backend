function listenToApi(app){
    app.get('/status',(request,response)=>{
        console.log('request recieved');
        response.json({ok : true , data : "Everything ok nigga"})
    })
    
    app.post('/info',(request,response)=>{
        console.log(request.headers,'request headers')
        console.log(request.body,'request body')
        response.json({ok:true , data : request.body})
    })
}

module.exports = listenToApi