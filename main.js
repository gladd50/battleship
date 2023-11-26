const boards = document.querySelectorAll('.board');
const ship = document.querySelector('#ship-place')
ship.addEventListener('dragstart', (e) => {
    console.log(e.target.firstElementChild.id)
    e.dataTransfer.setData('text/plain', e.target.firstElementChild.id)
})
boards.forEach(board => {
    let frag = new DocumentFragment();
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('dragover', (e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = "move";
            })
            cell.addEventListener('drop', (e) => {
                e.preventDefault()
                const shiping = document.querySelector(`#${e.dataTransfer.getData("text/plain")}`) 
                cell.replaceWith(shiping)
            })
            frag.append(cell);
        }   
    }
    board.append(frag);
});

