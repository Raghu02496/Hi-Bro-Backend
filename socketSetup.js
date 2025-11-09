export default function (io) {

    const onlineMap = new Map()

    io.on('connection', (socket) => {
        console.log("Client connected", socket.userId)
        onlineMap.set(socket.userId, socket.id)

        socket.on('sendMessage', (data) => {
            const recipent = onlineMap.get(data.toUserId)

            if(recipent){
                io.to(recipent).emit('sendMessage', data.message)
            }
        })

        socket.on('disconnect', () => {
            onlineMap.delete(socket.userId)
            console.log('Client disconnected', socket.id)
        })
    })
}