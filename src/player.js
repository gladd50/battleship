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
    const attack = () => {
        let hit = 0
        if (hit === 0){
            let res = 'illegal'
            while (res === 'illegal') {
                let randomRow = Math.floor(Math.random() * 11)
                let randomCol = Math.floor(Math.random() * 11)
                res = botBoard.receiveAttack(randomRow, randomCol)
            }
        }
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