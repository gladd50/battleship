import { Ship } from "./ship";

const gameBoard = () => {
    const board = []
    for (let i = 0; i < 10; i++) {
        board[i] = []
        for (let j = 0; j < 10; j++) {
            board[i].push('0')
        }
    }
    const placeShip = (row, col, len, dir) => {
        if (dir === 'h' && col + len > 10) {
            return 0
        }
        else if (dir === 'v' && row + len > 10) {
            return 0
        }
        for (let i = col; i < col + len; i++) {
            if (dir === 'h' && board[row][i] !== '0') {
                return 0
            }
        }
        for (let i = row; i < row + len; i++) {
            if (dir === 'v' && board[i][col] !== '0') {
                return 0
            }
        }
        const ship = Ship(len)
        if (dir === 'h') {
            for (let i = col; i < col + len; i++) {
                board[row].splice(i, 1, {ship})
            }
        }
        else if (dir === 'v') {
            for (let i = row; i < row + len; i++) {
                board[i].splice(col, 1, {ship})
            }
        }
        return true
    }
    return{
        board,
        placeShip
    }
}

export {gameBoard}