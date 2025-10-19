import { OpenAI } from "openai"
import { messageModel } from "./mongo.js";

export function sendStatus(request, response) {
    response.json({ ok: true, data: "Everything ok" })
}

export async function msgChatGpt(request, response) {
    const openai = new OpenAI({
        apiKey: process.env.DetectiveKey,
    });

    try {
        const { content, case_id } = request.body

        let previousConversations = await messageModel.find({case_id : case_id })

        previousConversations.push({ role: "user", content: content })

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
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