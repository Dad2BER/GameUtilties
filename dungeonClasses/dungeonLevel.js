import { TileMap } from "./tileMap.js";
import { LootGenerator } from "./lootGenerator.js";
import { rat, troll, giant, orc, dragon, ratSubtypeNames, trollSubtypeNames } from "./monster.js";

export class DungeonLevel extends TileMap {
    constructor(width, height, potionDictionary, scrollDictionary) {
        super(width, height);
        this.monsters = [];
        this.items = [];
        this.diceBag = this.myRandom;
        this.potionDictionary = potionDictionary;
        this.scrollDictionary = scrollDictionary;
        this.lootGenerator = new LootGenerator(this.potionDictionary, this.scrollDictionary);
//        this.populateLevel();
    }

    showMonsters() { this.monsters.forEach((monster) => monster.show()  );                            }
    showItems()    { this.items.forEach((item)=> item.show()            );                            } 
    showChests()   { this.items.forEach((item)=> { if (item.spriteType == "chest")   item.show(); }); }
    showPotions()  { this.items.forEach((item)=> { if (item.spriteType == "potions") item.show(); }); }
    showScrolls()  { this.items.forEach((item)=> { if (item.spriteType == "scrolls") item.show(); }); }
    showGold()     { this.items.forEach((item)=> { if (item.spriteType == "gold")    item.show(); })  }
    showMap()      { super.showAll()                                                                  }

    showLevelDetail(showMap, showMonsters, showChests, showPotions, showScrolls, showGold) {
        if (showMap)      this.showMap();
        if (showMonsters) this.showMonsters();
        if (showChests)   this.showChests();
        if (showPotions)  this.showPotions();
        if (showScrolls)  this.showScrolls();
        if (showGold)     this.showGold();
    }

    showAll() {
        this.showMap();
        this.showMonsters();
        this.showChests();
        this.showItems();
        console.log(this.items);
    }

    pickMonster(pt, difficulty) {
        let empty = 0;
        let ratPct = 0;
        let trollPct = 0;
        let giantPct = 0;
        let orcPct = 0;
        let dragonPct = 100;
        switch(difficulty) {
            case  0: empty = 25; ratPct = 100; trollPct =   0; giantPct =   0; orcPct =   0; dragonPct =   0; break;
            case  1: empty = 10; ratPct =  90; trollPct = 100; giantPct =   0; orcPct =   0; dragonPct =   0; break;
            case  2: empty = 10; ratPct =  80; trollPct =  90; giantPct = 100; orcPct =   0; dragonPct =   0; break;
            case  3: empty = 10; ratPct =  60; trollPct =  80; giantPct = 100; orcPct =   0; dragonPct =   0; break;
            case  4: empty =  5; ratPct =  40; trollPct =  70; giantPct = 100; orcPct =   0; dragonPct =   0; break;
            case  5: empty =  5; ratPct =  20; trollPct =  60; giantPct =  90; orcPct = 100; dragonPct =   0; break;
            case  6: empty =  5; ratPct =  10; trollPct =  50; giantPct =  80; orcPct = 100; dragonPct =   0; break;
            case  7: empty =  0; ratPct =   5; trollPct =  40; giantPct =  70; orcPct = 100; dragonPct =   0; break;
            case  8: empty =  0; ratPct =   5; trollPct =  30; giantPct =  60; orcPct =  90; dragonPct = 100; break;
            case  9: empty =  0; ratPct =   5; trollPct =  20; giantPct =  50; orcPct =  80; dragonPct = 100; break;
            case 10: empty =  0; ratPct =   5; trollPct =  10; giantPct =  40; orcPct =  70; dragonPct = 100; break;
            case 11: empty =  0; ratPct =   5; trollPct =  10; giantPct =  30; orcPct =  60; dragonPct = 100; break;
            case 12: empty =  0; ratPct =   5; trollPct =  10; giantPct =  20; orcPct =  50; dragonPct = 100; break;
            case 13: empty =  0; ratPct =   5; trollPct =  10; giantPct =  20; orcPct =  40; dragonPct = 100; break;
            case 14: empty =  0; ratPct =   5; trollPct =  10; giantPct =  20; orcPct =  30; dragonPct = 100; break;
            case 15: empty =  0; ratPct =   5; trollPct =  10; giantPct =  20; orcPct =  30; dragonPct = 100; break;
            default: empty =  0; ratPct =   0; trollPct =   0; giantPct =   0; orcPct =   0; dragonPct = 100; break;
        }
        let percent = this.diceBag.percent();
        let rMonster = null;
        if (percent < empty) { rMonster = null; } 
        else if (percent <= ratPct) { rMonster = new rat(pt.x, pt.y, this.diceBag.intBetween(0, ratSubtypeNames.length-1)); }
        else if (percent <= trollPct) { rMonster = new troll(pt.x, pt.y, this.diceBag.intBetween(0, trollSubtypeNames.length-1)); }
        else if (percent <= giantPct) { rMonster = new giant(pt.x, pt.y, 0); }
        else if (percent <= orcPct) { rMonster = new orc(pt.x, pt.y, 0); }
        else { rMonster = new dragon(pt.x, pt.y, 0); }
        return rMonster;
    }

    populateLevel(difficulty) {
        //Monsters go in every room, except the first (to make it safe for the player)
        for(let i=1; i<this.rooms.length; i++) {
            let pt = this.getRandomRoomPoint(i);
            let monster = this.pickMonster(pt, difficulty);
            if (monster != null) {
                monster.setRandomDirection();
                this.monsters.push(monster);
            }
        }
        for(let i=0; i<this.rooms.length; i++) {
            let rect = this.rooms[i].getHitBox();
            this.lootGenerator.generateDifficultyLoot(this.items, rect.expand(-16), difficulty);
        }
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.monsters.forEach((monster)=> { 
            monster.update(deltaTime);
            if ( this.adjustMovingObject(monster)==true || this.diceBag.percent()>99) { //If we collided with something change direction
                monster.setRandomDirection();
            }
        })
        this.items.forEach((item)=> { item.update(deltaTime); })
    }

    draw(context) {
        super.draw(context);
        this.monsters.forEach((monster, index)=>  { 
            monster.draw(context); 
            if (monster.markedForDeletion) { 
                this.monsters.splice(index, 1);
                console.log("monster deleted");
            }
        })
        this.items.forEach((item)=> {
            item.draw(context);
            if (item.markedForDeletion) { this.items.splice(index, 1);}
        }) 
    }

    //Helper function to make it easy to return monsters, chests, and items that are within a hitBox
    overlapItems(list, hitBox) {
        let overlap = [];
        list.forEach((item) => {
            if (item.getHitBox().overlap(hitBox)) { 
                overlap.push(item); 
            }
        })
        return overlap;
    }

    //Return a list of all the monsters that overlap with this hitBox
    monsterCollisions(hitBox) { return this.overlapItems(this.monsters, hitBox); }
    itemCollisions(hitBox)    { return this.overlapItems(this.items, hitBox); }

    removeItem(item) { this.items.splice(this.items.indexOf(item), 1); }
    removeMonster(monster) { this.monster.splice(this.monsters.indexOf(monster), 1); }

    openChest(chest) { 
        chest.open();
        let rect = chest.getHitBox();
        this.lootGenerator.generateJitterLoot(this.items, rect.expand(16), 2, 2, 2, 0);
    }



    
    showRoom(room) {
        super.showRoom(room);
        let roomRect = room.getHitBox();
        this.monsterCollisions(roomRect).forEach((monster) => {monster.show();})
        this.itemCollisions(roomRect).forEach((item) => {item.show();})
    }
}