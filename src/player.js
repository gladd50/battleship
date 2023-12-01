import { gameBoard } from "./board"

const playerBoard = gameBoard()
const botBoard = gameBoard()

const attacker = (board) => {
  const attack = (row, col) => {
    return board.receiveAttack(row, col)
  }
  return { attack }
}
const fleetCreator = (board) => {
  const createFleet = (row, col, len, dir) => {
    return board.placeShip(row, col, len, dir)
  }
  return { createFleet }
}
const fleetRandomizer = (board) => {
  const randomFleet = (shipLenAll) => {
    let AllPos = []
    shipLenAll.forEach((shipLen) => {
      const randomDir = Math.floor(Math.random() * 2) === 1 ? "h" : "v"
      const availableTiles = board.availableTiles(shipLen, randomDir)
      const randomTileIdx = Math.floor(Math.random() * availableTiles.length)
      AllPos.push(
        board.placeShip(
          availableTiles[randomTileIdx].row,
          availableTiles[randomTileIdx].col,
          shipLen,
          randomDir
        )
      )
    })
    return AllPos
  }
  return { randomFleet }
}
const player = () => {
  let turn = true
  const changeTurn = () => {
    turn = !turn
    return turn
  }
  const getTurn = () => turn
  return {
    gb: playerBoard,
    getTurn,
    changeTurn,
    ...attacker(botBoard),
    ...fleetCreator(playerBoard),
    ...fleetRandomizer(playerBoard),
  }
}
const bot = () => {
  let turn = false
  const changeTurn = () => {
    turn = !turn
    return turn
  }
  const getTurn = () => turn
  let targetStack = []
  const attack = () => {
    const attackTrail = ["hit"]
    if (targetStack.length > 0) {
      const secondHit = targetStack.pop()
      const secondHitRes = playerBoard.receiveAttack(
        secondHit.row,
        secondHit.col
      )
      attackTrail.push({ row: secondHit.row, col: secondHit.col })
      if (
        typeof playerBoard.board[secondHit.row][secondHit.col] === "object" &&
        playerBoard.board[secondHit.row][secondHit.col].ship.isSunk()
      ) {
        targetStack = []
        let allRes = {
          around:
            playerBoard.board[secondHit.row][secondHit.col].ship.aroundPos,
          hit: attackTrail,
        }
        return allRes
      }
      if (secondHitRes !== "hit a ship") return attackTrail
      const nextHitShipLen =
        playerBoard.board[secondHit.row][secondHit.col].ship.len
      for (let i = 1; i <= nextHitShipLen - 2; i++) {
        if (secondHit.dir === "down") {
          const nextHitResD = playerBoard.receiveAttack(
            secondHit.row + i,
            secondHit.col
          )
          attackTrail.push({ row: secondHit.row + i, col: secondHit.col })
          if (
            typeof playerBoard.board[secondHit.row + i][secondHit.col] ===
              "object" &&
            playerBoard.board[secondHit.row + i][secondHit.col].ship.isSunk()
          ) {
            targetStack = []
            let allRes = {
              around:
                playerBoard.board[secondHit.row + i][secondHit.col].ship
                  .aroundPos,
              hit: attackTrail,
            }
            return allRes
          }
          if (nextHitResD !== "hit a ship") {
            return attackTrail
          }
        }
        if (secondHit.dir === "up") {
          const nextHitResD = playerBoard.receiveAttack(
            secondHit.row - i,
            secondHit.col
          )
          attackTrail.push({ row: secondHit.row - i, col: secondHit.col })
          if (
            typeof playerBoard.board[secondHit.row - i][secondHit.col] ===
              "object" &&
            playerBoard.board[secondHit.row - i][secondHit.col].ship.isSunk()
          ) {
            targetStack = []
            let allRes = {
              around:
                playerBoard.board[secondHit.row - i][secondHit.col].ship
                  .aroundPos,
              hit: attackTrail,
            }
            return allRes
          }
          if (nextHitResD !== "hit a ship") {
            return attackTrail
          }
        }
        if (secondHit.dir === "right") {
          const nextHitResD = playerBoard.receiveAttack(
            secondHit.row,
            secondHit.col + i
          )
          attackTrail.push({ row: secondHit.row, col: secondHit.col + i })
          if (
            typeof playerBoard.board[secondHit.row][secondHit.col + i] ===
              "object" &&
            playerBoard.board[secondHit.row][secondHit.col + i].ship.isSunk()
          ) {
            targetStack = []
            let allRes = {
              around:
                playerBoard.board[secondHit.row][secondHit.col + i].ship
                  .aroundPos,
              hit: attackTrail,
            }
            return allRes
          }
          if (nextHitResD !== "hit a ship") {
            return attackTrail
          }
        }
        if (secondHit.dir === "left") {
          const nextHitResD = playerBoard.receiveAttack(
            secondHit.row,
            secondHit.col - i
          )
          attackTrail.push({ row: secondHit.row, col: secondHit.col - i })
          if (
            typeof playerBoard.board[secondHit.row][secondHit.col - i] ===
              "object" &&
            playerBoard.board[secondHit.row][secondHit.col - i].ship.isSunk()
          ) {
            targetStack = []
            let allRes = {
              around:
                playerBoard.board[secondHit.row][secondHit.col - i].ship
                  .aroundPos,
              hit: attackTrail,
            }
            return allRes
          }
          if (nextHitResD !== "hit a ship") {
            return attackTrail
          }
        }
      }
    }
    let availableAttacks = []
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (
          playerBoard.board[row][col] !== "X" &&
          !playerBoard.board[row][col].isHit
        ) {
          availableAttacks.push({ row, col })
        }
      }
    }
    if (availableAttacks.length === 0) {
      return "no available attack"
    }
    const attackTarget =
      availableAttacks[Math.floor(Math.random() * availableAttacks.length)]
    const res = playerBoard.receiveAttack(attackTarget.row, attackTarget.col)
    attackTrail.push({ row: attackTarget.row, col: attackTarget.col })
    if (res === "hit a ship") {
      if (
        !playerBoard.board[attackTarget.row][attackTarget.col].ship.isSunk()
      ) {
        const { row, col } = attackTarget
        if (row + 1 < 10) targetStack.push({ row: row + 1, col, dir: "down" })
        if (row - 1 >= 0) targetStack.push({ row: row - 1, col, dir: "up" })
        if (col + 1 < 10) targetStack.push({ row, col: col + 1, dir: "right" })
        if (col - 1 >= 0) targetStack.push({ row, col: col - 1, dir: "left" })
        const secondHit = targetStack.pop()
        const secondHitRes = playerBoard.receiveAttack(
          secondHit.row,
          secondHit.col
        )
        attackTrail.push({ row: secondHit.row, col: secondHit.col })
        if (
          typeof playerBoard.board[secondHit.row][secondHit.col] === "object" &&
          playerBoard.board[secondHit.row][secondHit.col].ship.isSunk()
        ) {
          targetStack = []
          let allRes = {
            around:
              playerBoard.board[secondHit.row][secondHit.col].ship.aroundPos,
            hit: attackTrail,
          }
          return allRes
        }
        if (secondHitRes !== "hit a ship") return attackTrail
        const nextHitShipLen =
          playerBoard.board[secondHit.row][secondHit.col].ship.len
        for (let i = 1; i <= nextHitShipLen - 2; i++) {
          if (secondHit.dir === "down") {
            const nextHitResD = playerBoard.receiveAttack(
              secondHit.row + i,
              secondHit.col
            )
            attackTrail.push({ row: secondHit.row + i, col: secondHit.col })
            if (
              typeof playerBoard.board[secondHit.row + i][secondHit.col] ===
                "object" &&
              playerBoard.board[secondHit.row + i][secondHit.col].ship.isSunk()
            ) {
              targetStack = []
              let allRes = {
                around:
                  playerBoard.board[secondHit.row + i][secondHit.col].ship
                    .aroundPos,
                hit: attackTrail,
              }
              return allRes
            }
            if (nextHitResD !== "hit a ship") {
              return attackTrail
            }
          }
          if (secondHit.dir === "up") {
            const nextHitResU = playerBoard.receiveAttack(
              secondHit.row - i,
              secondHit.col
            )
            attackTrail.push({ row: secondHit.row - i, col: secondHit.col })
            if (
              typeof playerBoard.board[secondHit.row - i][secondHit.col] ===
                "object" &&
              playerBoard.board[secondHit.row - i][secondHit.col].ship.isSunk()
            ) {
              targetStack = []
              let allRes = {
                around:
                  playerBoard.board[secondHit.row - i][secondHit.col].ship
                    .aroundPos,
                hit: attackTrail,
              }
              return allRes
            }
            if (nextHitResU !== "hit a ship") {
              return attackTrail
            }
          }
          if (secondHit.dir === "right") {
            const nextHitResR = playerBoard.receiveAttack(
              secondHit.row,
              secondHit.col + i
            )
            attackTrail.push({ row: secondHit.row, col: secondHit.col + i })
            if (
              typeof playerBoard.board[secondHit.row][secondHit.col + i] ===
                "object" &&
              playerBoard.board[secondHit.row][secondHit.col + i].ship.isSunk()
            ) {
              targetStack = []
              let allRes = {
                around:
                  playerBoard.board[secondHit.row][secondHit.col + i].ship
                    .aroundPos,
                hit: attackTrail,
              }
              return allRes
            }
            if (nextHitResR !== "hit a ship") {
              return attackTrail
            }
          }
          if (secondHit.dir === "left") {
            const nextHitResL = playerBoard.receiveAttack(
              secondHit.row,
              secondHit.col - i
            )
            attackTrail.push({ row: secondHit.row, col: secondHit.col - i })
            if (
              typeof playerBoard.board[secondHit.row][secondHit.col - i] ===
                "object" &&
              playerBoard.board[secondHit.row][secondHit.col - i].ship.isSunk()
            ) {
              targetStack = []
              let allRes = {
                around:
                  playerBoard.board[secondHit.row][secondHit.col - i].ship
                    .aroundPos,
                hit: attackTrail,
              }
              return allRes
            }
            if (nextHitResL !== "hit a ship") {
              return attackTrail
            }
          }
        }
      }
    }
    return attackTrail
  }
  return {
    gb: botBoard,
    attack,
    getTurn,
    changeTurn,
    ...fleetCreator(botBoard),
    ...fleetRandomizer(botBoard),
  }
}

export { player, bot }
