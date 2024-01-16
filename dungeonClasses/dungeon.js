import { DungeonLevel } from "./dungeonLevel.js";

export class Dungeon {
    constructor(width, height, numberLevels, potionDictionary, scrollDictionary) {
        this.maxLevel = numberLevels;
        this.levelIndex = 0;
        this.map = [];
        for(let level=0; level<numberLevels; level++) {
            this.map[level] = new DungeonLevel(width, height, potionDictionary, scrollDictionary);
            if (level < numberLevels-1) { this.map[level].addStairsDown(); } //Bottom of the dungeon, can't go down
            if (level > 0) { this.map[level].addStairsUp(); } //Top of the dungeon, can't go up
            this.map[level].populateLevel(level);
        }
        this.currentLevel = this.map[this.levelIndex];
    }
    
    // We don't call these directly from myGame, in case we ever add other items to Dungeon
    // or if we ever want to update more than just the current level
    update(deltaTime) { this.currentLevel.update(deltaTime); } 
    draw(context) { this.currentLevel.draw(context); }

    goDown(player) { 
        this.levelIndex++; 
        this.currentLevel = this.map[this.levelIndex];
        player.setLocation(this.currentLevel.stairsUp.x, this.currentLevel.stairsUp.y);
    }
    goUp(player) { 
        this.levelIndex--; 
        this.currentLevel = this.map[this.levelIndex];
        player.setLocation(this.currentLevel.stairsDown.x, this.currentLevel.stairsDown.y);
    }

    addPlayer(player) {
        //Player goes in the first room
        this.player = player;
        let room = this.currentLevel.rooms[0];
        this.player.setLocation(room.x + Math.floor(room.width/2), room.y + Math.floor(room.height/2));
    }

}

