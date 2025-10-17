import { mongoose } from "mongoose"
import { conversationSchema } from "./models.js"

export function connectMongo(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost:27017/cases').then(()=>{
            resolve()
            console.log('connected to mongodb');
        })
    })
}
export const conversationModel = mongoose.model('conversation',conversationSchema,'crimes');

