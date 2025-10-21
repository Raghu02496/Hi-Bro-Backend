import { OpenAI } from "openai"
import { messageModel, caseModel, interrogationModel } from "./mongo.js";
import mongoose from "mongoose";

export function sendStatus(request, response) {
    response.json({ ok: true, data: "Everything ok" })
}

export async function msgChatGpt(request, response) {
    const openai = new OpenAI({
        apiKey: process.env.DetectiveKey,
    });

    try {
        const { content,case_id,suspect } = request.body

        const curCase = await caseModel.findOne({_id : case_id})
        const interrogation = await interrogationModel.findOne({suspectId : suspect._id})

        // fetch the recent 10 messages
        let previousConversations = await messageModel.find(
            {suspectId : suspect._id },
            {role : 1,content : 1,_id:0}
        )
        .skip(interrogation.lastSummaryCount)
        .limit(10)

        //count the total number of messages
        let totalCount = await messageModel.countDocuments({suspectId : suspect._id })

        if(totalCount - interrogation.lastSummaryCount >= 10 ){
            interrogation.summary = await generateSummary(previousConversations,interrogation,openai)
            previousConversations = []
        }

        previousConversations.push({ role: "user", content: content })
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role : 'system' ,content : 'You are playing the role of suspect for my AI detective game, user is the detective and you will play the susupect'},
                {
                    role : 'user',
                    content : `suspect name : ${suspect.name}\n
                    suspect role : ${suspect.role}\n
                    case description : ${curCase.description}\n
                    suspects : ${curCase.suspects}\n
                    previous coversations summary for context: \n${interrogation.summary}`
                },
                ...previousConversations
            ]
        });
        
        const reply = completion.choices[0].message.content;

        await messageModel.insertMany([
            {case_id : case_id, role:'user', content : content,suspectId:suspect._id,interrogationId:interrogation._id},
            {case_id: case_id, role:'assistant', content : reply,suspectId:suspect._id,interrogationId:interrogation._id}
        ])
        response.json({ ok: true, data: reply });
    } catch (error) {
        console.log(error,'error')
        response.status(500).json({ ok: false, error: error })
    }
}

export async function getConversation(request, response){
    let { suspect_id } = request.body
    let previousConversations = await messageModel.find({suspectId : suspect_id},{__v : 0})

    try{
        response.json({ok : true , data : previousConversations})
    }catch(error){
        console.log(error,'error')
        response.status(500).json({ ok: false, error: error })
    }
}

async function generateSummary(previousConversations,interrogation,openai){
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role : 'system',
                content : 'You have to summarize and combine both previous and new conversation as much efficiently without losing key details(output should be just summary nothing else).'
            },
            {
                role : 'user',
                content : ` previous coversation summary : ${interrogation.summary},\n
                new conversation : ${JSON.stringify(previousConversations)}`
            }
        ]
    });

    const reply = completion.choices[0].message.content;

    await interrogationModel.updateOne({_id : interrogation._id},{$set : {summary : reply},$inc : {lastSummaryCount : 10}})

    return reply
}

export async function generateCase(request, response) {
    const openai = new OpenAI({
        apiKey: process.env.DetectiveKey,
    });

    try{
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a game AI that creates detective cases in JSON format only."
                },
                {
                    role: 'user',
                    content: `Generate a case for my AI detective game. 
                                Follow this JSON structure exactly:
                                {
                                    title: "",
                                    description: "",
                                    suspects: [
                                        { name: "", role: "", guilty: boolean }
                                    ],
                                    cluePool: [""]
                                }`
                }
            ]
        });
    
        const reply = JSON.parse(completion.choices[0].message.content);
        reply.suspects = reply.suspects.map(element => {
            const objectId = new mongoose.Types.ObjectId()
            return {_id : objectId,...element}
        });

        const insertedDoc = await caseModel.insertOne(reply);

        for(let suspect of insertedDoc.suspects){
            await interrogationModel.insertOne({caseId : insertedDoc._id,suspectId : suspect._id, lastSummaryCount : 0, summary : ""})
        }
        response.json({ok : true , data : {_id : insertedDoc._id , ...reply}})
    }catch(error){
        console.log(error,'error')
        response.status(500).json({ ok: false, error: error })
    }
}

export async function getCaseById(request,response) {
    try{
        const {case_id} = request.body
        const result = await caseModel.findById({_id : case_id},{"suspects.guilty" : 0})
        response.json({ok : true , data : result})
    }catch(error){
        console.log(error,'error')
        response.status(500).json({ ok: false, error: error })
    }
}