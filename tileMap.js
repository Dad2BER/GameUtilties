import { randomeBrickBrown, randomGrayFloor, door } from "./sprite_classes/knownSprites.js";
import { create2DArray, RandomNumber } from "./utilities.js";

const tileType = { FLOOR: 0, WALL: 1 };

export class TileMap {
    constructor(width,height){
        //Our initial implementation will just draw a wall around the boarder
        this.width = width;
        this.height = height;
        this.map = create2DArray(this.width, this.height);
        this.rooms = [];
        this.addRoomsandHalls(8, 3, 5);
    }

    wallCollision(objectHitBox) {
        let left = Math.floor(objectHitBox.x/32);
        let right = Math.ceil((objectHitBox.x+objectHitBox.width)/32);
        let top = Math.floor(objectHitBox.y/32);
        let bottom = Math.ceil((objectHitBox.y+objectHitBox.height)/32);
        for (let x=left; x<right; x++){
            for (let y = top; y<bottom; y++) {
                if (this.map[x][y].solid) { return true;}
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

    setMapTiles(left, top, width, height, type) {
        for(let x=left; x<left+width; x++) {
            for(let y=top; y<top+height; y++) {
                this.map[x][y] = type;
            }
        }
    }

    addRoomsandHalls(roomCount, minSize, maxSize) {
        let myRandom = new RandomNumber();
        //Initialize the whole map to walls and then we will carve out the rooms and halls
        this.setMapTiles(0, 0, this.width, this.height, tileType.WALL);
        //For the desired number of rooms, find a space we can carve out that leaves a wall on all sides
        let tryLimit = 100; //We can't guarantee they will all fit, but we can retry on failure to increase the chances
        while (tryLimit > 0 && this.rooms.length < roomCount) {
            let width = myRandom.intBetween(minSize, maxSize);
            let height = myRandom.intBetween(minSize, maxSize);
            let left = myRandom.intBetween(1, this.width-width-2);
            let top = myRandom.intBetween(1, this.height-height-2);
            if (this.isLocationAvailable(left, top, width, height)) {
                this.setMapTiles(left, top, width, height, tileType.FLOOR);
                this.rooms.push(new Room(left, top, width, height));
            }
            else {
                tryLimit--;
            }
        }
        this.convertGridToSprites();
        return this.rooms.length;
    }

    convertGridToSprites() {
        for(let x=0; x<this.width; x++) {
            for(let y=0; y<this.height; y++) {
                if(this.map[x][y] == tileType.FLOOR) {
                    this.map[x][y] = new randomGrayFloor(x*32+16,y*32+16);
                }
                else {
                    this.map[x][y] = new randomeBrickBrown(x*32+16,y*32+16);
                }
            }
        }

    }

    isLocationAvailable(roomLeft, roomTop, roomWidth, roomHeight) {
        //This checks each tile, the other way to do this is to check to see if it overlaps with  any room in the room list
        //Checking the room list would be faster, but is depednent on rooms being created first on the map
        if (roomLeft -1 < 0 || roomTop-1 < 0 || roomLeft+roomWidth > this.width-1 || roomTop+roomHeight > this.height-1) {
            return false;
        }
        for(let x=roomLeft-1; x<roomLeft+roomWidth+1; x++) {
            for(let y=roomTop-1; y<roomTop + roomHeight+1; y++) {
                if (this.map[x][y] == tileType.FLOOR) {
                    return false;
                }
            }
        }
        return true;
    }

}

class Room {
    constructor(x, y, width, height) {
        this.x = x*32;
        this.y = y*32;
        this.width = width*32;
        this.height = height*32;
    }
}