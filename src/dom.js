import {setupBoard,play,you,enemy,shipLenAll} from './game'

const DOM = {
    youBoard: document.querySelector('#you-board'),
    enemyBoard: document.querySelector('#enemy-board'),
    getYouTiles: () => document.querySelectorAll('.you-tile'),
    enemyTiles: document.querySelectorAll('.enemy-tile'),
    tiles: document.querySelectorAll('.tile'),
    tempShipCont: document.querySelector('.ship-temp-cont'),
    tempShips: document.querySelectorAll('.ship-temp'),
    getTempShip: () =>  document.querySelector('.ship-temp'),
}

const renderBoard = () => {
    const {youBoard, enemyBoard} = DOM
    const appendTiles = (board, name) => {
        const boardFrag = new DocumentFragment()
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const tile = document.createElement('div')
                tile.classList.add('tile')
                tile.dataset.row = row
                tile.dataset.col = col
                tile.classList.add(`${name}-tile`)
                boardFrag.append(tile)
            }
        }
        board.append(boardFrag)
    }
    appendTiles(youBoard, 'you')
    appendTiles(enemyBoard, 'enemy')
}

const setupGame = () => {
    renderBoard()
    /* ship drag */
    const {tempShipCont, tempShips, getYouTiles, getTempShip} = DOM
    const changeDir = () => {
        if (tempShipCont.style.display === 'block') {
            tempShipCont.style.display = 'flex';
            tempShipCont.firstElementChild.dataset.dir = 'h'
        } else {
            tempShipCont.style.display = 'block';
            tempShipCont.firstElementChild.dataset.dir = 'v'
        }
    }
    tempShips.forEach(tShip => {
        tShip.addEventListener('click', changeDir)
    })
    /* tiles drop */
    const youTiles = getYouTiles()
    const allowDrop = (e) => {
        e.preventDefault()
    }
    const handleShipPlace = (e) => {
        e.preventDefault()
        const prevTship = getTempShip()
        const shipData = {
            dir: prevTship.dataset.dir,
            len: prevTship.dataset.len
        }
        const shipPos = {
            row: e.target.dataset.row,
            col: e.target.dataset.col
        }
        const {dir, len} = shipData
        const {row, col} = shipPos
        const ready = you.createFleet(row, col, len, dir)
    }
    youTiles.forEach(tile =>{
        tile.addEventListener('dragover',(e) => allowDrop(e))
    })    
}

export {setupGame}