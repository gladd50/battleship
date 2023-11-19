const Ship = (length) => {
    return{
        len: length,
        hitted: 0,
        isHit: false,
        hit: function() {
            this.hitted += 1
        },
        isSunk: function() {
            return this.len === this.hitted ? true : false
        },
    }
}

export {Ship}