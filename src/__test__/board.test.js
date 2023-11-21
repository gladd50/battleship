import {gameBoard} from '../board'

test('Board 10 x 10', () => {
    const gb = gameBoard()
    expect(gb.board.length && gb.board[0].length).toBe(10)
})
test('Place ship length 1 to [4][7]', () => {
    const gb = gameBoard()
    gb.placeShip(4, 7, 1, 'h')
    expect(gb.board[4][7]).not.toBe('0')
})
test('Place ship length 5 to [3][5] horizontally', () => {
    const gb = gameBoard()
    gb.placeShip(3, 5, 5, 'h')
    expect(gb.board[3][5] && gb.board[3][6] && gb.board[3][7] && gb.board[3][8] && gb.board[3][9]).not.toBe('0')
})
test('Place ship length 3 to [2][1] vertically', () => {
    const gb = gameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.board[2][1] && gb.board[3][1] && gb.board[4][1]).not.toBe('0')
})
test('cannot Place ship if there was an existing ship', () => {
    const gb = gameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.placeShip(4, 1, 3, 'v')).toBeFalsy()
})
test('Occupying tiles around ship v', () => {
    const gb = gameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.board[2][0]).toBe('W')
})
test('Occupying tiles around ship [1][2] 3x1 v', () => {
    const gb = gameBoard()
    gb.placeShip(1, 2, 3, 'v')
    expect(gb.board[0][1]).toEqual('W')
    expect(gb.board[0][2]).toEqual('W')
    expect(gb.board[0][3]).toEqual('W')
    expect(gb.board[1][1]).toEqual('W')
    expect(gb.board[2][1]).toEqual('W')
    expect(gb.board[3][1]).toEqual('W')
    expect(gb.board[4][1]).toEqual('W')
    expect(gb.board[4][2]).toEqual('W')
    expect(gb.board[4][3]).toEqual('W')
    expect(gb.board[3][3]).toEqual('W')
    expect(gb.board[2][3]).toEqual('W')
    expect(gb.board[1][3]).toEqual('W')
})
test('cannot Place ship side to side to other ship', () => {
    const gb = gameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.placeShip(2, 2, 3, 'v')).toBeFalsy()
})
test('Horizontal ship overflow board', () => {
    const gb = gameBoard()
    expect(gb.placeShip(2, 8, 3, 'h')).toBeFalsy()
})
test('Vertical ship overflow board', () => {
    const gb = gameBoard()
    expect(gb.placeShip(8, 2, 3, 'v')).toBeFalsy()
})
test('Missed a shot', () => {
    const gb = gameBoard()
    gb.receiveAttack(0,0)
    expect(gb.board[0][0]).toBe('X')
})
test('shot the same open tile twice', () => {
    const gb = gameBoard()
    gb.receiveAttack(0,0)
    expect(gb.receiveAttack(0,0)).toBe('illegal')
})
test('shot the same boat tile twice', () => {
    const gb = gameBoard()
    gb.placeShip(0,0,1,'h')
    gb.receiveAttack(0,0)
    expect(gb.receiveAttack(0,0)).toBe('illegal')
})
test('Success landed a shot', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 1, 'h')
    gb.receiveAttack(0, 0)
    expect(gb.board[0][0].isHit).toBeTruthy()
    expect(gb.board[0][0].ship.hitted).toBe(1)
})
test('sinking ship 1x1', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 1, 'h')
    gb.receiveAttack(0, 0)
    expect(gb.board[0][0].ship.isSunk()).toBeTruthy()
})
test('sinking ship 3x1', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 3, 'h')
    gb.receiveAttack(0, 0)
    gb.receiveAttack(0, 1)
    gb.receiveAttack(0, 2)
    expect(gb.board[0][2].ship.isSunk()).toBeTruthy()
})
test('not sinking ship', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 2, 'h')
    gb.receiveAttack(0, 0)
    expect(gb.board[0][0].ship.isSunk()).toBeFalsy()
})
test('are the ship sink all?', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 1, 'h')
    gb.receiveAttack(0, 0)
    expect(gb.isOver()).toBeTruthy()
})
test('sinking all the ships', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 1, 'h')
    gb.receiveAttack(0, 0)
    gb.placeShip(2, 4, 1, 'h')
    gb.receiveAttack(2, 4)
    gb.placeShip(9, 6, 1, 'h')
    gb.receiveAttack(9, 6)
    expect(gb.isOver()).toBeTruthy()
})
test('not sinking all the ships', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 1, 'h')
    gb.receiveAttack(0, 0)
    gb.placeShip(2, 4, 1, 'h')
    gb.receiveAttack(2, 4)
    gb.placeShip(9, 6, 1, 'h')
    expect(gb.isOver()).toBeFalsy()
})
test('ship sink collaterall 1x1 [0][0]', () => {
    const gb = gameBoard()
    gb.placeShip(0, 0, 1, 'h')
    expect(gb.board[0][1]).toBe('W')
    expect(gb.board[1][0]).toBe('W')
    expect(gb.board[1][1]).toBe('W')
    gb.receiveAttack(0, 0)
    expect(gb.board[0][1]).toBe('X')
    expect(gb.board[1][0]).toBe('X')
    expect(gb.board[1][1]).toBe('X')
})
test('ship sink collaterall 3x1 [1][2] v', () => {
    const gb = gameBoard()
    gb.placeShip(1, 2, 3, 'v')
    gb.receiveAttack(1, 2)
    gb.receiveAttack(2, 2)
    gb.receiveAttack(3, 2)
    expect(gb.board[0][1]).toEqual('X')
    expect(gb.board[0][2]).toEqual('X')
    expect(gb.board[0][3]).toEqual('X')
    expect(gb.board[1][1]).toEqual('X')
    expect(gb.board[2][1]).toEqual('X')
    expect(gb.board[3][1]).toEqual('X')
    expect(gb.board[4][1]).toEqual('X')
    expect(gb.board[4][2]).toEqual('X')
    expect(gb.board[4][3]).toEqual('X')
    expect(gb.board[3][3]).toEqual('X')
    expect(gb.board[2][3]).toEqual('X')
    expect(gb.board[1][3]).toEqual('X')
})

