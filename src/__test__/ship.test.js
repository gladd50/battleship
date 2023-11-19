import {Ship} from '../ship'

test('Wether it can hit or not', () => {
    const ship = Ship(4)
    ship.hit()
    ship.hit()
    expect(ship.hitted).toBe(2)
})
test('Length property', () => {
    const ship = Ship(5)
    expect(ship.len).toBe(5)
})
test('Sinking ship', () => {
    const ship = Ship(4)
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(false)
    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(true)
})