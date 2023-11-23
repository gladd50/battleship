import { Ship } from "./ship";

const gameBoard = () => {
    const board = []
    for (let i = 0; i < 10; i++) {
        board[i] = []
        for (let j = 0; j < 10; j++) {
            board[i].push('0')
        }
    }
    const aroundShip = (row, col, dir, idx, aroundPos) => {
        if (dir === 'v') {
            if (idx === -1 || idx === -2) {
                if (row >= 0 && row < 10) {
                    board[row][col] = 'W';
                    aroundPos.push({row,col})
                }
            }
            if (col - 1 >= 0 && row >=0 && row < 10) {
                board[row][col - 1] = 'W';
                aroundPos.push({row,col: col - 1})
            }
            if (col + 1 < 10 && row >=0 && row < 10) {
                board[row][col + 1] = 'W';
                aroundPos.push({row,col: col + 1})
            }
        } else if (dir === 'h') {
            if (idx === -1 || idx === -2) {
                if (col >= 0 && col < 10) {
                  board[row][col] = 'W';
                  aroundPos.push({row,col})
                }
            }
            if (row - 1 >= 0 && col >= 0 && col < 10) {
                board[row - 1][col] = 'W';
                aroundPos.push({row: row - 1,col})
            }
            if (row + 1 < 10 && col >= 0 && col < 10) {
                board[row + 1][col] = 'W';
                aroundPos.push({row: row + 1,col})
            }
        }
    }
    const placeShip = (row, col, len, dir, isRandom = false, tempBoard = null) => {
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
        if (isRandom) {
            if (dir === 'h') {
                for (let i = col; i < col + len; i++) {
                    tempBoard[row][i] = 'Q'
                }
            } else if(dir === 'v'){
                for (let i = row; i < row + len; i++) {
                    tempBoard[i][col] = 'Q'
                }
            }
            return true
        }
        let ship = Ship(len)
        let shipIdx = 0
        let aroundPos = []
        if (dir === 'h') {
            for (let i = col; i < col + len; i++) {
                if (shipIdx === 0) {
                    aroundShip(row, i - 1, dir, -1, aroundPos)
                }
                if(shipIdx === len - 1 ){
                  aroundShip(row, i + 1, dir, -2, aroundPos)
                }
                board[row][i] = {ship, isHit: false}
                aroundShip(row, i, dir, shipIdx, aroundPos)
                shipIdx++
            }
        }
        else if (dir === 'v') {
            for (let i = row; i < row + len; i++) {
                if (shipIdx === 0) {
                    aroundShip(i - 1, col, dir, -1, aroundPos)
                }
                if(shipIdx === len - 1 ){
                    aroundShip(i + 1, col, dir, -2, aroundPos)
                }
                board[i][col] = {ship, isHit: false}
                aroundShip(i, col, dir, shipIdx, aroundPos)
                shipIdx++
            }
        }
        ship.aroundPos = aroundPos
        return true
    }
    const collaterallSunk = (row,col) => {
        const around = board[row][col].ship.aroundPos
        for (let i = 0; i < around.length; i++) {
            board[around[i].row][around[i].col] = 'X'
        }
    }
    const receiveAttack = (row,col) => {
        if (board[row][col] === 'X' || board[row][col].isHit) {
            return 'illegal'
        }else if (board[row][col].ship) {
            board[row][col].isHit = true
            board[row][col].ship.hit()
            if (board[row][col].ship.isSunk()) {
                collaterallSunk(row,col)
            }
            return 'hit a ship'
        } else{
            board[row][col] = 'X'
            return 'miss'
        }
    }
    const isOver = () => {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (board[i][j].ship && !board[i][j].ship.isSunk()) {
                    return false
                }
            }   
        }
        return true
    }
    const availableTiles = (len, dir) => {
        let avaiTiles = [];
        let tempBoard = JSON.parse(JSON.stringify(board)); 
    
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (placeShip(row, col, len, dir, true, tempBoard) !== 0) {
                    avaiTiles.push({ row, col });
                }
            }
        }
        return avaiTiles;
    }
    return{
        board,
        availableTiles,
        placeShip,
        receiveAttack,
        isOver
    }
}
export {gameBoard}