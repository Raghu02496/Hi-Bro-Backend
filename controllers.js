import { TodoModel } from "./mongo.js"
import { OpenAI } from "openai"

export function sendStatus(request, response) {
    response.json({ ok: true, data: "Everything ok" })
}

export async function addTodo(request, response) {
    const { done, string } = request.body;

    try {
        const todo = new TodoModel({ string: string, done: done })
        await todo.save();
        response.status(201).json({ ok: true, data: todo })
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

export async function getTodo(request, response) {
    const { limit, page } = request.body;

    try {
        const todos = await TodoModel.find().skip(parseInt(limit * (page - 1))).limit(parseInt(limit));
        response.json({ ok: true, data: todos })
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

export async function updateTodoById(request, response) {
    const { _id, string, done } = request.body;

    try {
        const todo = await TodoModel.findByIdAndUpdate(
            _id,
            { $set: { string: string, done: done } },
            { returnDocument: 'after' }
        )
        response.json({ ok: true, data: todo })
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

export async function deleteTodoById(request, response) {
    const { _id } = request.body;

    try {
        await TodoModel.findByIdAndDelete(_id)
        response.json({ ok: true })
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

export async function msgChatGpt(request, response) {
    const openai = new OpenAI({
        apiKey: process.env.DetectiveKey,
    });

    try {
        const { query } = request.body

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: query },
            ]
        });

        const reply = completion.choices[0].message.content;
        response.json({ ok: true, data: reply });
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}