import mongoose from "mongoose"
import { caseSchema, messageSchema, interrogationSchema } from "./schema.js"

export const caseModel = mongoose.model('cases',caseSchema,'cases');
export const messageModel = mongoose.model('messages',messageSchema, 'messages')
export const interrogationModel = mongoose.model('interrogations',interrogationSchema, 'interrogations')