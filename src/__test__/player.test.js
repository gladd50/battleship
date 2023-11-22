import {Player, Bot} from '../player'

test('check player turn', () => {
    const player1 = Player('You')
    const player2 = Bot('Enemy')
    expect(player1.turn()).toBeTruthy()
    expect(player2.turn()).toBeFalsy()
})
test('change player turn', () => {
    const player1 = Player('You')
    const player2 = Bot('Enemy')
    player1.changeTurn()
    player2.changeTurn()
    expect(player1.turn()).toBeFalsy()
    expect(player2.turn()).toBeTruthy()
})
test('player attack', () => {
    const player1 = Player('You')
    const player2 = Bot('Enemy')
    player1.attack(1,2)
    expect(player2.board[1][2]).toBe('X')
})
test('Bot attack', () => {
    const player1 = Player('You')
    const player2 = Bot('Enemy')
    player2.attack(1,2)
    expect(player1.board[1][2]).toBe('X')
})
test('create fleet', () => {
    const player1 = Player('You')
    const player2 = Bot('Enemy')
    player1.createFleet(0,0,1,'h')
    expect(player1.board[0][0]).not.toBe('0')
})

