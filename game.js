export default function createGame() {

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {

        state.players[command.playerId] = {
            x: command.playerX,
            y: command.playerY
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[command.fruitId] = {
            x: command.fruitX,
            y: command.fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                if (player.y - 1 >= 0) {
                    player.y = player.y - 1;
                }
            },
            ArrowDown(player) {
                if (player.y + 1 < state.screen.height) {
                    player.y = player.y + 1
                }
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0) {
                    player.x = player.x - 1
                }
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width) {
                    player.x = player.x + 1
                }
            }
        }

        const keyPressed = event.key
        const player = state.players[command.playerId]
        const movePlayer = acceptedMoves[keyPressed];

        if (player && movePlayer) {
            movePlayer(player)
            checkForFruitColision(player)
        }


        function checkForFruitColision(player) {

            for (const fruitId in state.fruits) {
                const fruit = state.fruits[fruitId]
                if (player.x === fruit.x && player.y === fruit.y) {
                    removeFruit({ fruitId: fruitId })
                }
            }

        }

    }

    return {
        movePlayer,
        addPlayer,
        addFruit,
        removePlayer,
        removeFruit,
        state
    }
}