/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeonClasses/dungeon.js";
import { statusText } from "./text.js";
import { Point, RandomNumber, direction } from "./utilities.js";
import { PlayerCanvas } from "./playerCanvas.js";
import { StoryText } from "./storyText.js";
import { PotionDictionary, potionColorText } from "./potion.js";


export class MyGame extends Game {
    constructor(mapCanvasID, playerCanvasID, storyTextAreaID, width, height) {
        super(mapCanvasID, width, height);
        this.overlayTexts = [];
        this.diceBag = new RandomNumber();
        this.potionDictionar = new PotionDictionary();
        this.player = new Player(0,0); //Does not matter where, because popualteLevel will move them.
        this.playerCanvas = new PlayerCanvas(this.player, playerCanvasID, this.potionDictionar);
        this.storyText = new StoryText(storyTextAreaID);
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),1,this.potionDictionar);
        this.dungeon.addPlayer(this.player);
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        if (deltaTime < 1000) { //The browser pauses the animation loop when we are not the focus, so ignore large time jumps
            this.player.handleInput(this.InputHandler.keys)
            this.player.update(deltaTime); //This allows the player to move and animate, but we may reset them later
            this.dungeon.update(deltaTime); //This allows all the monsters to move and animations to run
            this.dungeon.openHitDoor(this.player.getHitBox());
            this.dungeon.adjustMovingObject(this.player);
            //Monster attacks
            let monsters = this.dungeon.monsterCollisions(this.player.getHitBox());
            monsters.forEach((monster)=> { 
                if (monster.canAttack()) { //If the monster can attack then it does
                    let outputStr = "HIT: " + damage;
                    this.overlayTexts.push( new statusText(outputStr , monster.getLocation()) );
                    this.storyText.addLine("Rat did " + "damage to you!");
                    this.player.damagePlayer(damage);
                }
            })
            //Open Chests
            let chests = this.dungeon.chestCollisions(this.player.getHitBox());
            chests.forEach((chest)=> {
                if (!chest.isOpen) { 
                    chest.open();
                    this.overlayTexts.push( new statusText("Open" , chest.getLocation()) );
                    this.storyText.addLine("You open a chest...");
                }
            }) 
            //Pick Up Items
            let items = this.dungeon.itemCollisions(this.player.getHitBox());
            items.forEach((item, index) => {
                this.storyText.addLine("You have collected a " + potionColorText[item.color] + " potion.");
                this.player.addItem(item);
                this.dungeon.removeItem(item);
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

