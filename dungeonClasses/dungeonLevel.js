import { TileMap } from "./tileMap.js";
import { LootGenerator } from "./lootGenerator.js";
import { rat, ratSubtype } from "./monster.js";

export class DungeonLevel extends TileMap {
    constructor(width, height, potionDictionary, scrollDictionary) {
        super(width, height);
        this.monsters = [];
        this.treasureChests = [];
        this.items = [];
        this.diceBag = this.myRandom;
        this.potionDictionary = potionDictionary;
        this.scrollDictionary = scrollDictionary;
        this.lootGenerator = new LootGenerator(this.potionDictionary, this.scrollDictionary);
        this.populateLevel();
        //this.showAll();
    }

    showMonsters() { this.monsters.forEach((monster) => monster.show()  );                            }
    showChests()   { this.treasureChests.forEach((chest)=> chest.show() );                            }
    showItems()    { this.items.forEach((item)=> item.show()            );                            } 
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

    populateLevel() {
        //Monsters go in every room, except the first (to make it safe for the player)
        for(let i=1; i<this.rooms.length; i++) {
            let pt = this.getRandomRoomPoint(i);
            let monster = new rat(pt.x,pt.y,ratSubtype.BROWN);
            monster.setRandomDirection();
            this.monsters.push(monster);
        }
        for(let i=0; i<this.rooms.length; i++) {
            let rect = this.rooms[i].getHitBox();
            this.lootGenerator.generateJitterLoot(this.items, rect.expand(-16), 2, 2, 2, 1);
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
        this.treasureChests.forEach((chest)=> { chest.update(deltaTime); })
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
        this.treasureChests.forEach((chest)=> {
            chest.draw(context);
            if (chest.markedForDeletion) { this.treasureChests.splice(index, 1);}
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
    chestCollisions(hitBox) { return this.overlapItems(this.treasureChests, hitBox); }
    itemCollisions(hitBox) { return this.overlapItems(this.items, hitBox); }

    removeItem(item) { this.items.splice(this.items.indexOf(item), 1); }
    removeMonster(monster) { this.monster.splice(this.monsters.indexOf(monster), 1); }
    removeChest(chest) {this.treasureChests.splice(this.treasureChests.indexOf(chest), 1); }

    openChest(chest) { 
        chest.open();
        let rect = chest.getHitBox();
        this.lootGenerator.generateJitterLoot(this.items, rect.expand(16), 2, 2, 2, 0);
    }



    
    showRoom(room) {
        super.showRoom(room);
        let roomRect = room.getHitBox();
        this.monsterCollisions(roomRect).forEach((monster) => {monster.show();})
        this.chestCollisions(roomRect).forEach((chest) => {chest.show();})
        this.itemCollisions(roomRect).forEach((item) => {item.show();})
    }
}