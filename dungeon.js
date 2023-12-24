import { TileMap } from "./tileMap.js";
import { Point, direction } from "./utilities.js";

export class Dungeon {
    constructor(width, height, numberLevels) {
        this.maxLevel = numberLevels;
        this.currentlevel = 0;
        this.map = [];
        for(let level=0; level<numberLevels; level++) {
            this.map[level] = new TileMap(width, height);
            this.map[level].addDoors();
        }
    }
    update(deltaTime) {
        this.map[this.currentlevel].update(deltaTime);
    }
    draw(context) {
        this.map[this.currentlevel].draw(context);
    }
    adjustMovingObject(object) {
        return this.map[this.currentlevel].adjustMovingObject(object);
    }
    openHitDoor(hitBox) {
        this.map[this.currentlevel].openHitDoor(hitBox);
    }

    getRoom(levelIndex, roomIndex) {
        return this.map[levelIndex].rooms[roomIndex];
    }

    getLevelRooms(levelIndex) {
        return this.map[levelIndex].rooms;
    }

}