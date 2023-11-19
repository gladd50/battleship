import { Ship } from "./ship";

const GameBoard = () => {
    const board = []
    for (let i = 0; i < 10; i++) {
        board[i] = []
        for (let j = 0; j < 10; j++) {
            board[i][j].push('0')
        }
    }
    const placeShip = (row, col, len, dir) => {
        if (board[row][col] !== '0')return 0
        const ship = Ship(len)
        

    }
}