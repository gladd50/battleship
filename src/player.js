import { gameBoard } from "./board"

const playerBoard = gameBoard()
const botBoard = gameBoard()

const changeTurner = (turn) => {
    const changeTurn = () => {
        turn = !turn
        return turn
    }
    return {changeTurn}
}
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
    let playerTurn = true
    return{
        playerTurn,
        ...changeTurner(playerTurn),
        ...attacker(botBoard),
        ...fleetCreator(playerBoard),
        ...fleetRandomizer(playerBoard)
    }
}
const bot = () => {
    let playerTurn = false
    return{
        playerTurn,
        ...changeTurner(playerTurn),
        ...attacker(playerBoard),
        ...fleetCreator(botBoard),
        ...fleetRandomizer(botBoard)
    }
}