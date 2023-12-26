/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeon.js";
import { rat, ratSubtype } from "./monster.js";
import { statusText } from "./text.js";
import { Point, RandomNumber, direction } from "./utilities.js";
import { PlayerCanvas } from "./playerCanvas.js";
import { StoryText } from "./storyText.js";


export class MyGame extends Game {
    constructor(mapCanvasID, playerCanvasID, storyTextAreaID, width, height) {
        super(mapCanvasID, width, height);
        this.player = new Player(0,0); //Does not matter where, because popualteLevel will move them.
        this.playerCanvas = new PlayerCanvas(this.player, playerCanvasID);
        this.storyText = new StoryText(storyTextAreaID);
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),1);
        this.monsters = [];
        this.overlayTexts = [];
        this.populateLevel(0);
        this.diceBag = new RandomNumber();
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        if (deltaTime < 1000) { //The browser pauses the animation loop when we are not the focus, so ignore large time jumps
            this.player.handleInput(this.InputHandler.keys)
            this.player.update(deltaTime);
            this.dungeon.openHitDoor(this.player.getHitBox());
            this.dungeon.adjustMovingObject(this.player);
            this.monsters.forEach((monster)=> { 
                monster.update(deltaTime);
                if ( this.dungeon.adjustMovingObject(monster)==true || this.diceBag.percent()>99) { //If we collided with something change direction
                    monster.setRandomDirection();
                }
                if (monster.getHitBox().overlap(this.player.getHitBox()) && monster.canAttack()) { //Monster Overlaps with Player
                    let damage = monster.meleAttack();
                    let outputStr = "HIT: " + damage;
                    this.overlayTexts.push( new statusText(outputStr , monster.getLocation()) );
                    this.storyText.addLine("Rat did " + "damage to you!");
                    this.player.damagePlayer(damage);
                    console.log("Player Hit");
                }
            })
            this.overlayTexts.forEach((txt) => {txt.update(deltaTime);  })
            this.playerCanvas.update(deltaTime);
        }
        else {
            this.storyText.addLine("Time Jump Avoided: " + deltaTime);
        }
        this.draw(this.ctx);
        return true;
    }
    
    draw(context){
        super.draw(context);
        this.dungeon.draw(context);
        this.player.draw(context);
        this.monsters.forEach((monster, index)=>  { 
            monster.draw(context); 
            if (monster.markedForDeletion) { this.monsters.splice(index, 1);}
        })
        this.overlayTexts.forEach((txt, index) => { 
            txt.draw(context); 
            if (txt.markedForDeletion) { this.overlayTexts.splice(index, 1);}
        })
    }

    populateLevel(levelIndex) {
        let rooms = this.dungeon.getLevelRooms(levelIndex);
        this.player.setLocation(rooms[0].x + Math.floor(rooms[0].width/2),
                                rooms[0].y + Math.floor(rooms[0].height/2));
        for(let i=1; i<rooms.length; i++) {
            let x = this.randomNUmber.intBetween(rooms[i].x, rooms[i].x+rooms[i].width-32)+16;
            let y = this.randomNUmber.intBetween(rooms[i].y, rooms[i].y+rooms[i].height-32)+16;
            this.storyText.addLine("A rat was born in room " + i + " (" + x + ", " + y + ")");
            let monster = new rat(x,y,ratSubtype.BROWN);
            monster.setRandomDirection();
            this.monsters.push(monster);       
            this.overlayTexts.push( new statusText("Rat", new Point(x,y)) )
       }
    }

}
