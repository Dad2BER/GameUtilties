export const direction = {LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3};

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

export class Point {
    constructor(x,y) {this.x = x; this.y = y;}
}

export class JitterPoint extends Point {
    constructor(x, y, jitterX, jitterY) { 
        super(x + Math.floor(Math.random()*jitterX*2) - jitterX, 
              y + Math.floor(Math.random()*jitterY*2) - jitterY);
    }
}

export class HitBox {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    overlap(target) {
        if ( (this.x+this.width) < target.x  || (target.x+target.width) < this.x || 
             (this.y+this.height) < target.y || (target.y+target.height) < this.y) {
                return false;
        }
        return true;
    }
}

export const sidedDice = {d4: 4, d6: 6, d8: 8, d10: 10, d12: 12, d20: 20};
export class RandomNumber{
    constructor() {}
    intBetween(min, max) {return Math.floor(Math.random() * (max - min + 1) + min) }
    int(max) {return this.intBetween(0, max);}
    d20() {return this.intBetween(1,20);}
    d10(){return this.intBetween(1,10);}
    d8() {return this.intBetween(1,8);}
    d6() {return this.intBetween(1,6);}
    d4() { return this.intBetween(1,4);}
    roll(numberDice, diceType) {
        let rValue = this.intBetween(1,diceType); //take advantage that diceType is the actual max value
        for(let i=1; i<numberDice; i++) { rValue += this.intBetween(1,diceType);}
        return rValue;
    }
    percent() {return this.intBetween(1,100);}
}
