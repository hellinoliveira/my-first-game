import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

const game = createGame();

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
console.log(game.state)

sockets.on('connection', (socket) => {
    console.log(`> Player Connect with id:  ${socket.id}`)

    socket.emit('setup', game.state)
})

app.use(express.static('public'))

server.listen(3000, () => {
    console.log('running 3000....')
})