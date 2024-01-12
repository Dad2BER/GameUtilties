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
        }
        this.currentLevel = this.map[this.levelIndex];
    }
    
    update(deltaTime) { this.currentLevel.update(deltaTime); }
    draw(context) { this.currentLevel.draw(context); }
    adjustMovingObject(object) { return this.currentLevel.adjustMovingObject(object); }
    openHitDoor(hitBox) { this.currentLevel.openHitDoor(hitBox); }

    getRoom(levelIndex, roomIndex) { return this.map[levelIndex].rooms[roomIndex]; }

    levelRooms() { return this.currentLevel.rooms; }
    levelChests() { return this.currentLevel.treasureChests; }
    levelItems() { return this.currentLevel.items; }
    levelMonsters() { return this.currentLevel.monsters; }
    openChest(chest) { 
        chest.open();
        let rect = chest.getHitBox();
        level.lootGenerator.generateJitterLoot(this.currentLevel.items, rect.expand(16), 2, 2, 2, 0);
    }
    showOverlapingTiles(hitBox) { return this.currentLevel.showOverlapyingTiles(hitBox);}
    getRoomFromPoint(pt) { return this.currentLevel.getRoomFromPoint(pt);}
    showRoom(room) {return this.currentLevel.showRoom(room);}
    monsterCollisions(hitBox) { return this.currentLevel.monsterCollisions(hitBox); }
    chestCollisions(hitBox) { return this.currentLevel.chestCollisions(hitBox); }
    itemCollisions(hitBox) { return this.currentLevel.itemCollisions(hitBox); }
    stairCollisions(hitBox) { return this.currentLevel.stairCollisions(hitBox); }
    getOverlapTiles(hitBox) { return this.currentLevel.getOverlapTiles(hitBox); }

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

    removeItem(item) {
        this.currentLevel.removeItem(item);
    }

    addPlayer(player) {
        //Player goes in the first room
        this.player = player;
        let room = this.currentLevel.rooms[0];
        this.player.setLocation(room.x + Math.floor(room.width/2), room.y + Math.floor(room.height/2));
    }

    showLevel() { this.currentLevel.showAll(); }
    showLevelDetail(showMap, showMonsters, showChests, showPotions, showScrolls, showGold) {
        if (showMap)      this.currentLevel.showMap();
        if (showMonsters) this.currentLevel.showMonsters();
        if (showChests)   this.currentLevel.showChests();
        if (showPotions)  this.currentLevel.showPotions();
        if (showScrolls)  this.currentLevel.showScrolls();
        if (showGold)     this.currentLevel.showGold();
    }


}

