import { Potion } from "./potion.js";
import { Scroll } from "./scroll.js";
import { Gold } from "./gold.js";
import { TreasureChest } from "./treasureChest.js";


import { RandomNumber } from "./utilities.js";

export class LootGenerator {
    constructor(potionDictionary, scrollDictionary) {
        this.potionDictionary = potionDictionary;
        this.scrollDictionary = scrollDictionary;
        this.diceBag = new RandomNumber();
    }

    generateLoot(list, maxGold, maxPotions, maxScrolls, maxChests) {
        let addGold = this.diceBag.intBetween(0,maxGold); //How many potions 
        let addPotions = this.diceBag.intBetween(0,maxPotions); // How many scrolls 
        let addScrolls = this.diceBag.intBetween(0,maxScrolls); //How many gold pilse 
        let addChests = this.diceBag.intBetween(0,maxChests); //How many Chests to put in this room
        for (let j=0; j<addChests; j++)  { list.push( new TreasureChest(0,0)); }
        for (let j=0; j<addPotions; j++) { list.push( this.potionDictionary.getRandom() ); }
        for (let j=0; j<addScrolls; j++) { list.push( this.scrollDictionary.getRandom() ); }
        for (let j=0; j<addGold; j++)    { list.push( new Gold(0, 0, this.diceBag.d6()+1)); }
    }

    //Randomly distribute loot around the Center Point
    generateJitterLoot(list, boundingRect, maxGold, maxPotions, maxScrolls, maxChests) { //QUEsTION:  Do we want to add minimum values?
        let items = [];
        this.generateLoot(items, maxGold, maxPotions, maxScrolls, maxChests);
        items.forEach((item) => {
            let pt = this.diceBag.ptInRect(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
            item.setLocation(pt.x, pt.y);
            list.push(item);
        })
    }

}