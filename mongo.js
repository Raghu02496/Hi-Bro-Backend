import { mongoose } from "mongoose"
import { caseSchema, messageSchema, interrogationSchema } from "./models.js"

export function connectMongo(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost:27017/detective').then(()=>{
            resolve()
            console.log('connected to mongodb');
        })
    })
}

export const caseModel = mongoose.model('cases',caseSchema,'cases');
export const messageModel = mongoose.model('messages',messageSchema, 'messages')
export const interrogationModel = mongoose.model('interrogations',interrogationSchema, 'interrogations')

