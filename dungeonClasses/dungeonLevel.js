import { TileMap } from "./tileMap.js";
import { Point, direction } from "../utilities.js";
import { rat, ratSubtype } from "./monster.js";
import { TreasureChest } from "../treasureChest.js";
import { Potion } from "./potion.js";
import { Gold } from "./gold.js";

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
       for(let i=0; i<this.rooms.length; i++) {
            let dieRoll = this.diceBag.d10();
            let addPotions = this.diceBag.intBetween(0,2); //How many potions to put in this room
            let addChests = this.diceBag.intBetween(0,1); //How many Chests to put in this room
            let addGold = this.diceBag.intBetween(0,2); //How many gold pilse to put in this room
            for (let j=0; j<addChests; j++) {
                let RandomPoint = this.getRandomRoomPoint(i);
                this.treasureChests.push(new TreasureChest(RandomPoint.x,RandomPoint.y));
            }
            for (let j=0; j<addPotions; j++) {
                let RandomPoint = this.getRandomRoomPoint(i);
                let randomPotion = this.potionDictionary.getRandom();
                this.items.push(new Potion(RandomPoint.x,RandomPoint.y, randomPotion.color));
            }
            for (let j=0; j<addGold; j++) {
                let RandomPoint = this.getRandomRoomPoint(i);
                this.items.push(new Gold(RandomPoint.x, RandomPoint.y, this.diceBag.d6()+1));
            }
        }
    }
    
    getRandomRoomPoint(roomIndex) {
        let x = this.diceBag.intBetween(this.rooms[roomIndex].x, this.rooms[roomIndex].x+this.rooms[roomIndex].width-32)+16;
        let y = this.diceBag.intBetween(this.rooms[roomIndex].y, this.rooms[roomIndex].y+this.rooms[roomIndex].height-32)+16;
        return new Point(x,y);
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