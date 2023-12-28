import { TileMap } from "./tileMap.js";
import { Point, direction } from "../utilities.js";
import { rat, ratSubtype } from "../monster.js";
import { TreasureChest } from "../treasureChest.js";
import { Potion } from "../potion.js";

export class DungeonLevel extends TileMap {
    constructor(width, height, potionDictionary) {
        super(width, height);
        this.monsters = [];
        this.treasureChests = [];
        this.items = [];
        this.diceBag = this.myRandom;
        this.potionDictionary = potionDictionary;
        this.populateLevel();
    }

    populateLevel() {
        //Monsters go in every room, except the first (to make it safe for the player)
        for(let i=1; i<this.rooms.length; i++) {
            let x = this.diceBag.intBetween(this.rooms[i].x, this.rooms[i].x+this.rooms[i].width-32)+16;
            let y = this.diceBag.intBetween(this.rooms[i].y, this.rooms[i].y+this.rooms[i].height-32)+16;
            let monster = new rat(x,y,ratSubtype.BROWN);
            monster.setRandomDirection();
            this.monsters.push(monster);       
       }
       //0-2 Treasure Chests go in each room 
       for(let i=0; i<this.rooms.length; i++) {
            let dieRoll = this.diceBag.d10();
            let addPotions = this.diceBag.intBetween(0,2);
            let addChests = this.diceBag.intBetween(0,1);
            for (let j=0; j<addChests; j++) {
                let x = this.diceBag.intBetween(this.rooms[i].x, this.rooms[i].x+this.rooms[i].width-32)+16;
                let y = this.diceBag.intBetween(this.rooms[i].y, this.rooms[i].y+this.rooms[i].height-32)+16;
                this.treasureChests.push(new TreasureChest(x,y));
            }
            for (let j=0; j<addPotions; j++) {
                let x = this.diceBag.intBetween(this.rooms[i].x, this.rooms[i].x+this.rooms[i].width-32)+16;
                let y = this.diceBag.intBetween(this.rooms[i].y, this.rooms[i].y+this.rooms[i].height-32)+16;
                let randomPotion = this.potionDictionary.getRandom();
                this.items.push(new Potion(x,y, randomPotion.color));
            }
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
            if (monster.markedForDeletion) { this.monsters.splice(index, 1);}
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

    removeFromList(list, thing) {
        
    }
    removeItem(item) { this.items.splice(this.items.indexOf(item), 1); }
    removeMonster(monster) { this.monster.splice(this.monsters.indexOf(monster), 1); }
    removeChest(chest) {this.treasureChests.splice(this.treasureChests.indexOf(chest), 1); }
}