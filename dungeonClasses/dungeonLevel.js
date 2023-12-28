import { TileMap } from "./tileMap.js";
import { Point, direction } from "../utilities.js";
import { rat, ratSubtype } from "../monster.js";
import { TreasureChest } from "../treasureChest.js";

export class DungeonLevel extends TileMap {
    constructor(width, height) {
        super(width, height);
        this.monsters = [];
        this.treasureChests = [];
        this.items = [];
    }

    populateLevel() {
        //Monsters go in every other room
        for(let i=1; i<this.rooms.length; i++) {
            let x = this.randomNUmber.intBetween(rooms[i].x, rooms[i].x+rooms[i].width-32)+16;
            let y = this.randomNUmber.intBetween(rooms[i].y, rooms[i].y+rooms[i].height-32)+16;
            this.storyText.addLine("A rat was born in room " + i + " (" + x + ", " + y + ")");
            let monster = new rat(x,y,ratSubtype.BROWN);
            monster.setRandomDirection();
            this.monsters.push(monster);       
            this.overlayTexts.push( new statusText("Rat", new Point(x,y)) )
       }
       //0-2 Treasure Chests go in each room 
       for(let i=0; i<this.rooms.length; i++) {
            for(let j=0; j<2; j++) {
                if (this.randomNUmber.intBetween(0,1) == 1) {
                    let x = this.randomNUmber.intBetween(rooms[i].x, rooms[i].x+rooms[i].width-32)+16;
                    let y = this.randomNUmber.intBetween(rooms[i].y, rooms[i].y+rooms[i].height-32)+16;
                    this.treasureChests.push(new TreasureChest(x,y));
                }
            }
       }       
   }

    update(deltaTime) {
        super.update(deltaTime);
    }

    draw(context) {
        super.draw(context);
        this.doors.forEach((door) => {door.draw(context);})
        this.monsters.forEach((monster, index)=>  { 
            monster.draw(context); 
            if (monster.markedForDeletion) { this.monsters.splice(index, 1);}
        })
        this.treasureChests.forEach((chest)=> {
            chest.draw(context);
            if (chest.markedForDeletion) { this.treasureChests.splice(index, 1);}
        }) 
    }
}