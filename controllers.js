const mongo = require('./mongo')

function sendStatus(request, response) {
    response.json({ ok: true, data: "Everything ok" })
}

async function addTodo(request, response) {
    const { done, string } = request.body;

    try {
        const todo = new mongo.TodoModel({ string: string, done: done })
        await todo.save();
        response.status(201).json({ ok: true, msg: 'todo added' })
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

async function getTodo(request, response) {
    const { limit, page } = request.body;

    try {
        const todos = await mongo.TodoModel.find().skip(parseInt(limit * page)).limit(parseInt(limit));
        response.json({ ok: true, data: todos })
    } catch (error) {
        response.status(500).json({ ok: false, error: error })
    }
}

module.exports = {
    sendStatus,
    addTodo,
    getTodo
}