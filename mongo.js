import mongoose from "mongoose"


export function connectMongo(){
    return mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('Connected to MongoDB');
    }).catch(()=>{
        console.log('MongoDB connection failed:',err.message);
    });
}



