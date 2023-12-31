/* eslint-disable no-undef */
import { player, bot } from "../player"

test("check player turn", () => {
  const player1 = player()
  const player2 = bot()
  expect(player1.getTurn()).toBeTruthy()
  expect(player2.getTurn()).toBeFalsy()
})
test("change player turn", () => {
  const player1 = player()
  const player2 = bot()
  player1.changeTurn()
  player2.changeTurn()
  expect(player1.getTurn()).toBeFalsy()
  expect(player2.getTurn()).toBeTruthy()
})
test("player attack", () => {
  const player1 = player()
  const player2 = bot()
  player1.attack(1, 2)
  expect(player2.gb.board[1][2]).toBe("X")
})
test("create fleet", () => {
  const player1 = player()
  player1.createFleet(0, 0, 1, "h")
  expect(player1.gb.board[0][0]).not.toBe("0")
})
test("create random fleet player", () => {
  const player1 = player()
  const shipLenAll = [5, 4, 3, 3, 2]

  expect(player1.randomFleet(shipLenAll)).toBe("fleet ready")
})
test("create random fleet player", () => {
  const player2 = bot()
  const shipLenAll = [5, 4, 3, 3, 2]

  expect(player2.randomFleet(shipLenAll)).toBe("fleet ready")
})
