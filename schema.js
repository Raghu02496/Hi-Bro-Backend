import mongoose from "mongoose"

export const caseSchema = new mongoose.Schema({
    title : String,
    description : String,
    cluePool : Array,
    suspects : Array
})

export const messageSchema = new mongoose.Schema({
    case_id : mongoose.Schema.Types.ObjectId,
    suspectId : mongoose.Schema.Types.ObjectId,
    interrogationId : mongoose.Schema.Types.ObjectId,
    role : String,
    content : String,
})

export const interrogationSchema = new mongoose.Schema({
    suspectId : mongoose.Schema.Types.ObjectId,
    caseId : mongoose.Schema.Types.ObjectId,
    lastSummaryCount : Number,
    summary : String
})

export const userSchema = new mongoose.Schema({
    userName : {type : String, required : true, unique : true},
    password : {type : String, required : true}
})