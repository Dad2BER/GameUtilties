import { DungeonLevel } from "./dungeonLevel.js";

export class Dungeon {
    constructor(width, height, numberLevels) {
        this.maxLevel = numberLevels;
        this.currentlevel = 0;
        this.map = [];
        for(let level=0; level<numberLevels; level++) {
            this.map[level] = new DungeonLevel(width, height);
        }
    }
    
    update(deltaTime) { this.map[this.currentlevel].update(deltaTime); }
    draw(context) { this.map[this.currentlevel].draw(context); }
    adjustMovingObject(object) { return this.map[this.currentlevel].adjustMovingObject(object); }
    openHitDoor(hitBox) { this.map[this.currentlevel].openHitDoor(hitBox); }

    getRoom(levelIndex, roomIndex) { return this.map[levelIndex].rooms[roomIndex]; }

    getLevelRooms() { return this.map[this.currentlevel].rooms; }
    getLevelChests() { return this.map[this.currentlevel].treasureChests; }
    getLevelItems() { return this.map[this.currentlevel].items; }
    getLevelMonsters() { return this.map[this.currentlevel].monsters; }

    addPlayer(player) {
        //Player goes in the first room
        this.player = player;
        let room = this.map[this.currentlevel].rooms[0];
        this.player.setLocation(room.x + Math.floor(room.width/2), room.y + Math.floor(room.height/2));
    }

}

