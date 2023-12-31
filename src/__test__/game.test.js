/* eslint-disable no-undef */
import { setupBoard, play, you, enemy, shipLenAll } from "../game"
const setBoard = setupBoard()
test("return true if the board is complete placing ship manually", () => {
  you.createFleet(0, 0, 1, "h")
  you.createFleet(0, 2, 1, "h")
  you.createFleet(0, 4, 1, "h")
  you.createFleet(2, 0, 1, "h")
  you.createFleet(2, 2, 1, "h")
  expect(setBoard.isAllowed()).toBe("ready")
})
test("return false if the board is complete placing ship manually", () => {
  you.createFleet(0, 0, 1, "h")
  you.createFleet(0, 2, 1, "h")
  you.createFleet(0, 3, 1, "h")
  you.createFleet(2, 0, 1, "h")
  expect(setBoard.isAllowed()).toBe("not ready")
})
test("return true if the board is complete placing ship randomly", () => {
  you.randomFleet(shipLenAll)
  expect(setBoard.isAllowed()).toBe("ready")
})
test("changing turn after player attack", () => {
  play(0, 0)
  expect(you.getTurn()).toBeFalsy()
  expect(enemy.getTurn()).toBeTruthy()
})
test("changing turn after bot attack", () => {
  play(0, 0)
  play()
  expect(you.getTurn()).toBeTruthy()
  expect(enemy.getTurn()).toBeFalsy()
})
test("not changing turn if player hit a ship", () => {
  enemy.createFleet(0, 0, 1, "h")
  play(0, 0)
  expect(you.getTurn()).toBeTruthy()
  expect(enemy.getTurn()).toBeFalsy()
})
test("not changing turn if player hit multiple ship", () => {
  enemy.createFleet(0, 0, 1, "h")
  enemy.createFleet(0, 2, 1, "h")
  enemy.createFleet(2, 0, 1, "h")
  play(0, 0)
  play(0, 2)
  play(2, 0)
  expect(you.getTurn()).toBeTruthy()
  expect(enemy.getTurn()).toBeFalsy()
})
