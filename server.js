import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

const game = createGame();

game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

game.start();

sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer({ playerId: playerId })

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
        console.log(`> Player disconnected: ${playerId}`)
    })

    // since we dont have authentication we overwrite the type and playerId to keep it more safe
    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'
        
        game.movePlayer(command)
    })
})

app.use(express.static('public'))

server.listen(3000, () => {
    console.log('running 3000....')
})