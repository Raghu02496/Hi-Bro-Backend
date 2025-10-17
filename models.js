import { mongoose } from "mongoose"

export const toDoSchema = new mongoose.Schema({
    done : Boolean,
    string : String
})