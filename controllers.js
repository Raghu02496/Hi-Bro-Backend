import { OpenAI } from "openai"
import { conversationModel } from "./mongo.js";

export function sendStatus(request, response) {
    response.json({ ok: true, data: "Everything ok" })
}

export async function msgChatGpt(request, response) {
    const openai = new OpenAI({
        apiKey: process.env.DetectiveKey,
    });

    try {
        const { content } = request.body

        let previousConversations = await conversationModel.find({},{role : 1 , content : 1 , _id : 0})

        previousConversations.push({ role: "user", content: content })

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                ...previousConversations
            ]
        });
        
        const reply = completion.choices[0].message.content;
        await conversationModel.insertMany([
            {role:'user' , content : content},
            {role:'assistant' , content : reply}
        ])
        response.json({ ok: true, data: reply });
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

export async function getConversation(request, response){
    let previousConversations = await conversationModel.find({},{role : 1 , content : 1 , _id : 0})

    try{
        response.json({ok : true , data : previousConversations})
    }catch(error){
        response.status(500).json({ ok: false, error: error })
    }
}