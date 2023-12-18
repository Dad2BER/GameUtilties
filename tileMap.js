import { randomeBrickBrown, randomGrayFloor, door } from "./sprite_classes/knownSprites.js";
import { create2DArray } from "./utilities.js";

export class TileMap {
    constructor(width,height){
        //Our initial implementation will just draw a wall around the boarder
        this.width = width;
        this.height = height;
        this.map = create2DArray(this.width, this.height);
        console.log(this);
        for(let x=0; x<this.width; x++) {
            for(let y=0; y<this.height; y++) {
                if (y==0 || y == (height-1)) { //If Top or Bottom
                    this.map[x][y] = new randomeBrickBrown(x*32+16,y*32+16);
                }
                else if (x==0 || x == (width-1)) { //Else if Left or Right
                    this.map[x][y] = new randomeBrickBrown(x*32+16,y*32+16);
                }
                else { //Middle of Rectangle
                    this.map[x][y] = new randomGrayFloor(x*32+16,y*32+16);
                }
            }
        }
    }

    wallCollision(objectHitBox) {
        let left = Math.floor((objectHitBox.x-16)/32);
        let right = Math.ceil((objectHitBox.x+objectHitBox.width-16)/32);
        let top = Math.floor((objectHitBox.y-16)/32);
        let bottom = Math.ceil((objectHitBox.y+objectHitBox.height-16)/32);
        for (let x=left; x<right; x++){
            for (let y = top; y<bottom; y++) {
                if (this.map[x-1][y-1].solid) { return true;}
            }
        }
        return false;
    }

    draw(context) {
        for(let x=0; x<this.width; x++) {
            for(let y=0; y<this.height; y++) {
                this.map[x][y].draw(context);
            }
        }
    }
}