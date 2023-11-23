import { gameBoard } from "./board"

const playerBoard = gameBoard()
const botBoard = gameBoard()

const attacker = (board) => {
    const attack = (row, col) => {
        return board.receiveAttack(row, col)
    }
    return {attack}
}
const fleetCreator = (board) => {
    const createFleet = (row, col, len, dir) => {
        return board.placeShip(row, col, len, dir)
    }
    return {createFleet}
}
const fleetRandomizer = (board) => {
    const randomFleet = (shipLenAll) => {
        shipLenAll.forEach(shipLen => {
            const randomDir = Math.floor(Math.random() * 2) === 1 ? 'h' : 'v'
            const availableTiles = board.availableTiles(shipLen, randomDir)
            const randomTileIdx = Math.floor(Math.random() * availableTiles.length)
            board.placeShip(availableTiles[randomTileIdx].row, availableTiles[randomTileIdx].col, shipLen, randomDir)
        });
    }
    return {randomFleet}
}
const player = () => {
    let turn = true
    const changeTurn = () => {
        turn = !turn
        return turn
    }
    const getTurn = () => turn
    return{
        gb: playerBoard,
        getTurn,
        changeTurn,
        ...attacker(botBoard),
        ...fleetCreator(playerBoard),
        ...fleetRandomizer(playerBoard)
    }
}
const bot = () => {
    let turn = false
    const changeTurn = () => {
        turn = !turn
        return turn
    }
    const getTurn = () => turn
    let targetStack = []
    const attack = () => {
        let availableAttacks = []
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (playerBoard.board[row][col] !== 'X' && !playerBoard.board[row][col].ship.isHit) {
                    targetStack.push({row, col})
                }
            }   
        }
        if (availableAttacks.length === 0) {
            return 'no available attack'
        }
        const attackTiles = Math.floor(Math.random() * availableAttacks.length)
    }
    return{
        gb: botBoard,
        getTurn,
        changeTurn,
        ...fleetCreator(botBoard),
        ...fleetRandomizer(botBoard)
    }
}

export {player, bot}