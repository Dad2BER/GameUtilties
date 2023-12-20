export function create2DArray(rows, columns) {
    let my2dArray = [];
    for (let i = 0; i < rows; i++) {
        my2dArray[i] = [];
        for (let j = 0; j < columns; j++) {
            my2dArray[i][j] = j;
        }
    }
    return my2dArray;
}

export class HitBox {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class RandomNumber{
    constructor() {}
    intBetween(min, max) { return Math.floor(Math.random() * (max-min)) + min;}
}