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
    startBtn: document.querySelector('.start-btn'),
    randomBtn: document.querySelector('#random-btn'),
    resetBtn: document.querySelector('#reset-btn'),
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
    let shipInfoTemp = [...shipInfo]
    /* ship drag */
    const {tempShipCont, tempShips, getYouTiles, getTempShip, shipName, startBtn, randomBtn, resetBtn} = DOM
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
    const removePrevTship = () => {
        while(tempShipCont.firstElementChild){
            tempShipCont.removeChild(tempShipCont.firstElementChild)
        }
    }
    const renderShips = (shipPos) => {
        for (let shipIdx = 0; shipIdx < shipPos.length; shipIdx++) {
            const {row, col} = shipPos[shipIdx]
            const newShipQuery = `.you-tile[data-row="${row}"][data-col="${col}"]`
            const newShip = document.querySelector(newShipQuery)
            newShip.classList.add('ship')
        }
    }
    const renderAround = (aroundPos) => {
        for (let aroundIdx = 0; aroundIdx < aroundPos.length; aroundIdx++) {
            const {row, col} = aroundPos[aroundIdx]
            const newAroundQuery = `.you-tile[data-row="${row}"][data-col="${col}"]`
            const newAround = document.querySelector(newAroundQuery)
            newAround.classList.add('around')
        }
    }
    const hideStartBtn = () => {
        startBtn.classList.add('hide')
    }
    const showStartBtn = () => {
        startBtn.classList.remove('hide')
    }
    const handleShipPlace = (e) => {
        e.preventDefault()
        const prevTship = getTempShip()
        const shipData = {
            dir: prevTship.dataset.dir,
            len: parseInt(prevTship.dataset.len, 10)
        }
        const shipPosBoard = {
            row: parseInt(e.target.dataset.row, 10),
            col: parseInt(e.target.dataset.col, 10)
        }
        const {dir, len} = shipData
        const {row, col} = shipPosBoard
        const {shipPos, aroundPos} = you.createFleet(row, col, len, dir)
        const createTempShips = () => {
            const nextTshipInfo = shipInfoTemp.pop()
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
        if (shipPos){
            removePrevTship()
            createTempShips()
            renderShips(shipPos)
            renderAround(aroundPos)
        }
        if (shipName.textContent === '') {
            showStartBtn()
        }
    }

    youTiles.forEach(tile =>{
        tile.addEventListener('dragover',(e) => allowDrop(e))
        tile.addEventListener('drop',(e) => handleShipPlace(e))
    })    

    /* feature button */
    const resetBoardDOM = (isRandom) => {
        you.gb.resetBoard()
        youTiles.forEach(tile => {
            tile.classList.remove('ship')
            tile.classList.remove('around')
        })
        removePrevTship()
        shipInfoTemp = [...shipInfo]
        shipName.textContent = ''
        if (isRandom !== 'random') {
            hideStartBtn()
            const createFirstTship = () => {
                for (let i = 0; i < 5; i++) {
                    const newTship = document.createElement('div')
                    newTship.classList.add('ship-temp')
                    newTship.dataset.dir = 'h'
                    newTship.dataset.len = 5
                    shipName.textContent = 'Carrier'
                    newTship.addEventListener('click', changeDir)
                    tempShipCont.append(newTship)
                }
            }
            createFirstTship()
            tempShipCont.style.display = 'flex'
        }
    }
    const randomizeBoard = () => {
        resetBoardDOM('random')
        const AllPos = you.randomFleet(shipLenAll)
        AllPos.forEach(pos => {
            const {shipPos, aroundPos} = pos
            renderShips(shipPos)
            renderAround(aroundPos)
        })
        showStartBtn()
    }
    resetBtn.addEventListener('click', ()=> resetBoardDOM('not random'))
    randomBtn.addEventListener('click', randomizeBoard)
}

const initGame = () => {
    const {startBtn, resetBtn, randomBtn} = DOM
    const hideBtn = () => {
        startBtn.classList.add('hide')
        resetBtn.classList.add('hide')
        randomBtn.classList.add('hide')
    }

}

export {setupGame}