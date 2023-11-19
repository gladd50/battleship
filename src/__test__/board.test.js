import {GameBoard} from '../board'

test('Board 10 x 10', () => {
    const gb = GameBoard()
    expect(gb.board.length && gb.board[0].length).toBe(10)
})
test('Place ship length 1 to [4][7]', () => {
    const gb = GameBoard()
    gb.placeShip(4, 7, 1, 'h')
    expect(gb.board[4][7]).toBeTruthy()
})
test('Place ship length 5 to [3][5] horizontally', () => {
    const gb = GameBoard()
    gb.placeShip(3, 3, 5, 'h')
    expect(gb.board[3][5] && gb.board[3][6] && gb.board[3][7] && gb.board[3][8] && gb.board[3][9]).toBeTruthy()
})
test('Place ship length 3 to [2][1] vertically', () => {
    const gb = GameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.board[2][1] && gb.board[3][1] && gb.board[4][1]).toBeTruthy()
})
test('cannot Place ship if there was an existing ship', () => {
    const gb = GameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.placeShip(4, 1, 3, 'v')).toBeFalsy()
})
test('Occupying tiles around ship', () => {
    const gb = GameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.board[1][1] && gb.board[3][2] && gb.board[3][0]&& gb.board[5][1]).toBe('O')
})
test('cannot Place ship side to side to other ship', () => {
    const gb = GameBoard()
    gb.placeShip(2, 1, 3, 'v')
    expect(gb.placeShip(2, 2, 3, 'v')).toBeFalsy()
})