import {player, bot} from './player'

const you = player()
const enemy = bot()
const shipLenAll = [5,4,3,2,2]

const setupBoard = () => {
    enemy.randomFleet(shipLenAll)
    const isAllowed = () => {
        return you.gb.countShip() === 5 ? 'ready' : 'not ready'
    }
    return{isAllowed}
}

const play = (row,col) => {
    let res = null
    if (you.getTurn()) {
        res = you.attack(row,col)
    } else {
        enemy.attack()
    }
    if (res !== 'hit as ship') {
        you.changeTurn()
        enemy.changeTurn()
        return res
    }
    return res
}

export {setupBoard,play,you,enemy,shipLenAll}