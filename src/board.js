import { Ship } from "./ship";

const gameBoard = () => {
    const board = []
    for (let i = 0; i < 10; i++) {
        board[i] = []
        for (let j = 0; j < 10; j++) {
            board[i].push('0')
        }
    }
    const aroundShip = (row, col, dir, idx) => {
        if (dir === 'v') {
            if (idx === -1 || idx === -2) {
              console.log(row)
                if (row >= 0 && row < 10) {
                    board[row][col] = 'arr';
                }
            }
            if (col - 1 >= 0 && row >=0 && row < 10) {
                board[row][col - 1] = 'arr';
            }
            if (col + 1 < 10 && row >=0 && row < 10) {
                board[row][col + 1] = 'arr';
            }
        } else if (dir === 'h') {
            if (idx === -1 || idx === -2) {
                if (col >= 0 && col < 10) {
                  board[row][col] = 'arr';
                }
            }
            if (row - 1 >= 0 && col >= 0 && col < 10) {
                board[row - 1][col] = 'arr';
            }
            if (row + 1 < 10 && col >= 0 && col < 10) {
                board[row + 1][col] = 'arr';
            }
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
        let shipIdx = 0
        if (dir === 'h') {
            for (let i = col; i < col + len; i++) {
                if (shipIdx === 0) {
                    aroundShip(row, i - 1, dir, -1)
                }
                else if(shipIdx === len - 1 ){
                  aroundShip(row, i + 1, dir, -2)
                }
                board[row][i] = {ship}
                aroundShip(row, i, dir, shipIdx)
                shipIdx++
            }
        }
        else if (dir === 'v') {
            for (let i = row; i < row + len; i++) {
                if (shipIdx === 0) {
                    aroundShip(i - 1, col, dir, -1)
                }
                else if(shipIdx === len - 1 ){
                    aroundShip(i + 1, col, dir, -2)
                }
                board[i][col] = {ship}
                aroundShip(i, col, dir, shipIdx)
                shipIdx++
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