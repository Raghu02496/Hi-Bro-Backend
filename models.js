import { mongoose } from "mongoose"

export const conversationSchema = new mongoose.Schema({
    role : String,
    content : String
})