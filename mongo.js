import { mongoose } from "mongoose"
import { toDoSchema } from "./models.js"

export function connectMongo(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost:27017/todo').then(()=>{
            resolve()
            console.log('connected to mongodb');
        })
    })
}
export const TodoModel = mongoose.model('todo',toDoSchema,'todo_collection');

