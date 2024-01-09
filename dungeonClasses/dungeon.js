import { DungeonLevel } from "./dungeonLevel.js";

export class Dungeon {
    constructor(width, height, numberLevels, potionDictionary, scrollDictionary) {
        this.maxLevel = numberLevels;
        this.currentlevel = 0;
        this.map = [];
        for(let level=0; level<numberLevels; level++) {
            this.map[level] = new DungeonLevel(width, height, potionDictionary, scrollDictionary);
            if (level < numberLevels-1) { this.map[level].addStairsDown(); } //Bottom of the dungeon, can't go down
            if (level > 0) { this.map[level].addStairsUp(); } //Top of the dungeon, can't go up
        }
    }
    
    update(deltaTime) { this.map[this.currentlevel].update(deltaTime); }
    draw(context) { this.map[this.currentlevel].draw(context); }
    adjustMovingObject(object) { return this.map[this.currentlevel].adjustMovingObject(object); }
    openHitDoor(hitBox) { this.map[this.currentlevel].openHitDoor(hitBox); }

    getRoom(levelIndex, roomIndex) { return this.map[levelIndex].rooms[roomIndex]; }

    levelRooms() { return this.map[this.currentlevel].rooms; }
    levelChests() { return this.map[this.currentlevel].treasureChests; }
    levelItems() { return this.map[this.currentlevel].items; }
    levelMonsters() { return this.map[this.currentlevel].monsters; }
    openChest(chest) { return this.map[this.currentlevel].openChest(chest); }
    showOverlapingTiles(hitBox) { return this.map[this.currentlevel].showOverlapyingTiles(hitBox);}
    getRoomFromPoint(pt) { return this.map[this.currentlevel].getRoomFromPoint(pt);}
    showRoom(room) {return this.map[this.currentlevel].showRoom(room);}
    monsterCollisions(hitBox) { return this.map[this.currentlevel].monsterCollisions(hitBox); }
    chestCollisions(hitBox) { return this.map[this.currentlevel].chestCollisions(hitBox); }
    itemCollisions(hitBox) { return this.map[this.currentlevel].itemCollisions(hitBox); }
    stairCollisions(hitBox) { return this.map[this.currentlevel].stairCollisions(hitBox); }

    goDown(player) { 
        this.currentlevel++; 
        player.setLocation(this.map[this.currentlevel].stairsUp.x, this.map[this.currentlevel].stairsUp.y);
    }
    goUp(player) { 
        this.currentlevel--; 
        player.setLocation(this.map[this.currentlevel].stairsDown.x, this.map[this.currentlevel].stairsDown.y);
    }

    removeItem(item) {
        this.map[this.currentlevel].removeItem(item);
    }

    addPlayer(player) {
        //Player goes in the first room
        this.player = player;
        let room = this.map[this.currentlevel].rooms[0];
        this.player.setLocation(room.x + Math.floor(room.width/2), room.y + Math.floor(room.height/2));
    }

    showLevel() { this.map[this.currentlevel].showAll(); }
    showLevelDetail(showMap, showMonsters, showChests, showPotions, showScrolls, showGold) {
        let level = this.map[this.currentlevel];
        if (showMap)      level.showMap();
        if (showMonsters) level.showMonsters();
        if (showChests)   level.showChests();
        if (showPotions)  level.showPotions();
        if (showScrolls)  level.showScrolls();
        if (showGold)     level.showGold();
    }


}

