const Ship = (len, dir) => {
    return{
        len,
        hitted: 0,
        hit: function() {
            this.hitted += 1
        },
        isSunk: function() {
            return this.len === this.hitted ? true : false
        },
    }
}

export {Ship}