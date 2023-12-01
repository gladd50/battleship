import { player, bot } from "./player"

const you = player()
const enemy = bot()
const shipLenAll = [5, 4, 3, 2, 2]

const setupBoard = () => {
  enemy.randomFleet(shipLenAll)
  const isAllowed = () => {
    return you.gb.countShip() === 5 ? "ready" : "not ready"
  }
  return { isAllowed }
}

const play = (row, col) => {
  const result = {
    player: {
      around: null,
    },
    enemy: {
      hit: null,
      around: null,
    },
  }
  const changePlayer = () => {
    you.changeTurn()
    enemy.changeTurn()
  }

  const pRes = you.attack(row, col)
  if (pRes === "illegal") {
    return pRes
  }
  if (pRes === "hit a ship") {
    return result
  } else if (typeof pRes === "object") {
    result.player.around = pRes
  }
  changePlayer()

  const eRes = enemy.attack()
  if (Array.isArray(eRes) && eRes[0] === "hit") {
    result.enemy.hit = eRes
  } else {
    result.enemy.around = eRes.around
    result.enemy.hit = eRes.hit
  }
  changePlayer()
  return result
}

export { setupBoard, play, you, enemy, shipLenAll }
