import { OpenAI } from "openai"
import { messageModel, caseModel } from "./mongo.js";

export function sendStatus(request, response) {
    response.json({ ok: true, data: "Everything ok" })
}

export async function msgChatGpt(request, response) {
    const openai = new OpenAI({
        apiKey: process.env.DetectiveKey,
    });

    try {
        const { content, case_id } = request.body

        let curCase = await caseModel.findOne({_id : case_id})

        // fetch the recent 10 messages
        let previousConversations = await messageModel.find({case_id : case_id }).skip(curCase.lastSummaryCount).limit(10)

        //count the total number of messages
        let totalCount = await messageModel.countDocuments({case_id : case_id })

        if(totalCount - curCase.lastSummaryCount >= 10 ){
            curCase.summary = await generateSummary(previousConversations,curCase,openai)
            previousConversations = []
        }

        previousConversations.push({ role: "user", content: content })
        
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {role : 'system', content : `previous coversations summary ${curCase.summary}`},
                ...previousConversations
            ]
        });
        
        const reply = completion.choices[0].message.content;

        await messageModel.insertMany([
            {case_id : case_id, role:'user', content : content},
            {case_id: case_id, role:'assistant', content : reply}
        ])
        response.json({ ok: true, data: reply });
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

export async function getConversation(request, response){
    let { case_id } = request.body
    let previousConversations = await messageModel.find({case_id : case_id},{__v : 0})

    try{
        response.json({ok : true , data : previousConversations})
    }catch(error){
        response.status(500).json({ ok: false, error: error })
    }
}

async function generateSummary(previousConversations,curCase,openai){

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role : 'system',
                content : `Summarize and compress this conversation as much possible without losing key details.
                previous summary : ${curCase.summary},
                new messages : ${JSON.stringify(previousConversations)}`
            }
        ]
    });

    const reply = completion.choices[0].message.content;

    const newSummary = curCase.summary ? (curCase.summary+'\n'+reply) : reply

    await caseModel.updateOne({_id : curCase._id},{$set : {summary : newSummary},$inc : {lastSummaryCount : 10}})

    return newSummary
}