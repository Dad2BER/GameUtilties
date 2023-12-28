/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeonClasses/dungeon.js";
import { statusText } from "./text.js";
import { Point, RandomNumber, direction } from "./utilities.js";
import { PlayerCanvas } from "./playerCanvas.js";
import { StoryText } from "./storyText.js";
import { PotionDictionary } from "./potion.js";


export class MyGame extends Game {
    constructor(mapCanvasID, playerCanvasID, storyTextAreaID, width, height) {
        super(mapCanvasID, width, height);
        this.overlayTexts = [];
        this.diceBag = new RandomNumber();
        this.potionDictionar = new PotionDictionary();
        this.player = new Player(0,0); //Does not matter where, because popualteLevel will move them.
        this.playerCanvas = new PlayerCanvas(this.player, playerCanvasID, this.potionDictionar);
        this.storyText = new StoryText(storyTextAreaID);
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),1);
        this.dungeon.addPlayer(this.player);
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        if (deltaTime < 1000) { //The browser pauses the animation loop when we are not the focus, so ignore large time jumps
            this.player.handleInput(this.InputHandler.keys)
            this.player.update(deltaTime);
            this.dungeon.openHitDoor(this.player.getHitBox());
            this.dungeon.adjustMovingObject(this.player);
            let monsters = this.dungeon.getLevelMonsters();
            monsters.forEach((monster)=> { 
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
                }
            })
            let treasureChests = this.dungeon.getLevelChests();
            treasureChests.forEach((chest)=> {
                chest.update(deltaTime);
                if (chest.getHitBox().overlap(this.player.getHitBox()) && !chest.isOpen) { //Monster Overlaps with Player
                    chest.open();
                    this.overlayTexts.push( new statusText("Open" , chest.getLocation()) );
                    this.storyText.addLine("You open a chest...");
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
        this.overlayTexts.forEach((txt, index) => { 
            txt.draw(context); 
            if (txt.markedForDeletion) { this.overlayTexts.splice(index, 1);}
        })
        this.player.draw(context);
    }

}

