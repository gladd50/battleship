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
    shipName: document.querySelector('.ship-name'),
}
const shipInfo = [
    {name: 'Patrol Boat', len: 2},
    {name: 'Submarine', len: 3},
    {name: 'Destroyer', len: 3},
    {name: 'Battleship', len: 4},
]

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
    const {tempShipCont, tempShips, getYouTiles, getTempShip, shipName} = DOM
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
            len: parseInt(prevTship.dataset.len, 10)
        }
        const shipPos = {
            row: parseInt(e.target.dataset.row, 10),
            col: parseInt(e.target.dataset.col, 10)
        }
        const {dir, len} = shipData
        const {row, col} = shipPos
        console.log(row,col,len,dir)
        const shipsBoardPos = you.createFleet(row, col, len, dir)
        console.log(shipsBoardPos)
        const removePrevTship = () => {
            while(tempShipCont.firstElementChild){
                tempShipCont.removeChild(tempShipCont.firstElementChild)
            }
        }
        const createTempShips = () => {
            const nextTshipInfo = shipInfo.pop()
            if (nextTshipInfo) {
                for (let i = 0; i < nextTshipInfo.len; i++) {
                    const newTship = document.createElement('div')
                    newTship.classList.add('ship-temp')
                    newTship.dataset.dir = shipData.dir
                    newTship.dataset.len = nextTshipInfo.len
                    shipName.textContent = nextTshipInfo.name
                    newTship.addEventListener('click', changeDir)
                    tempShipCont.append(newTship)
                }
            } else{
                shipName.textContent = ''
            }
        }
        const renderShips = () => {
            for (let shipIdx = 0; shipIdx < shipsBoardPos.length; shipIdx++) {
                const {row, col} = shipsBoardPos[shipIdx]
                const newShipQuery = `.you-tile[data-row="${row}"][data-col="${col}"]`
                const newShip = document.querySelector(newShipQuery)
                newShip.classList.add('ship')
            }
        }
        if (shipsBoardPos){
            removePrevTship()
            createTempShips()
            renderShips()
            console.log(you.gb.board)
        }
    }
    youTiles.forEach(tile =>{
        tile.addEventListener('dragover',(e) => allowDrop(e))
        tile.addEventListener('drop',(e) => handleShipPlace(e))
    })    
}

export {setupGame}