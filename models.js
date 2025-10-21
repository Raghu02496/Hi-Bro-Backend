import { mongoose } from "mongoose"

export const caseSchema = new mongoose.Schema({
    title : String,
    description : String,
    suspects : Array,
    cluePool : Array,
    lastSummaryCount : Number,
    summary : String
})

export const messageSchema = new mongoose.Schema({
    case_id : String,
    role : String,
    content : String
})