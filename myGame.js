/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeonClasses/dungeon.js";
import { playerDamageText, monsterDamageText, statusText } from "./text.js";
import { Point, RandomNumber, direction } from "./utilities.js";
import { PlayerCanvas } from "./playerCanvas.js";
import { StoryText } from "./storyText.js";
import { PotionDictionary, potionColorText } from "./dungeonClasses/potion.js";
import { ScrollDictionary, scrollColorText } from "./dungeonClasses/scroll.js";


export class MyGame extends Game {
    constructor(mapCanvasID, playerCanvasID, storyTextAreaID, width, height) {
        super(mapCanvasID, width, height);
        this.overlayTexts = [];
        this.diceBag = new RandomNumber();
        this.potionDictionary = new PotionDictionary();
        this.scrollDictionary = new ScrollDictionary();
        this.player = new Player(0,0); //Does not matter where, because popualteLevel will move them.
        this.playerCanvas = new PlayerCanvas(this.player, playerCanvasID, this.potionDictionary, this.scrollDictionary);
        this.storyText = new StoryText(storyTextAreaID);
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),1,this.potionDictionary, this.scrollDictionary);
        this.dungeon.addPlayer(this.player);
        this.readyForInput = true;
    }
    
    handleInput() {
        let keys = this.InputHandler.keys;
        this.player.handleInput(keys); // Arrow keys
        this.playerCanvas.handleInput(keys); // 'p' and 's'
        if (this.readyForInput) {
            if ( keys.includes('q')) { // Quaff a potion
                this.storyText.addLine(this.playerCanvas.quaffPotion());
            }
            if ( keys.includes('r') ) {// Read a scroll
                this.storyText.addLine(this.playerCanvas.readScroll());
            }
        }
        this.readyForInput = keys.includes('q')==false && keys.includes('r')==false;
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        if (deltaTime < 1000) { //The browser pauses the animation loop when we are not the focus, so ignore large time jumps
            this.handleInput();
            this.player.update(deltaTime); //This allows the player to move and animate, but we may reset them later
            this.dungeon.update(deltaTime); //This allows all the monsters to move and animations to run
            this.dungeon.openHitDoor(this.player.getHitBox());
            this.dungeon.adjustMovingObject(this.player);
            //Monster attacks and Player Attacks
            let monsters = this.dungeon.monsterCollisions(this.player.getHitBox());
            monsters.forEach((monster)=> { 
                //Notice that the player can only attack monsters they overlap with, so this is a mele attack
                //Also the canAttack will get set to false after the first attack so player will only attack the first monster
                //Also the player always gets initiative, so if the player hits the monster the monster resets cooldown 
                //                                                and thus canAttack for the monster will retrun fallse
                if (this.player.canAttack()) { 
                    let playerDamage = this.player.meleAttack(monster);
                    this.overlayTexts.push( new playerDamageText(playerDamage.toString() , this.player.getLocation()) );
                    if (playerDamage > 0) {
                        if (monster.takeDamage(playerDamage) < 0) { //Did we kill the monster
                            this.storyText.addLine("You killed the " + monster.name);
                            monster.markedForDeletion = true;
                        }
                        else {
                            this.storyText.addLine("You hit the " + monster.name + " for " + playerDamage + " damage");
                        }
                    }
                    else {
                        this.storyText.addLine("You missed the " + monster.name);
                    }
                }
                if (monster.canAttack()) { //If the monster can attack then it does
                    let damage = monster.meleAttack();
                    this.overlayTexts.push( new monsterDamageText(damage , monster.getLocation()) );
                    this.storyText.addLine("Rat did " + damage + " damage to you!");
                    this.player.damagePlayer(damage);
                }
            })
            //Open Chests
            let chests = this.dungeon.chestCollisions(this.player.getHitBox());
            chests.forEach((chest)=> {
                if (!chest.isOpen) { 
                    this.dungeon.openChest(chest);
                    this.overlayTexts.push( new statusText("Open" , chest.getLocation()) );
                    this.storyText.addLine("You open a chest...");
                }
            }) 
            //Pick Up Items
            let items = this.dungeon.itemCollisions(this.player.getHitBox());
            items.forEach((item, index) => {
                switch(item.spriteType) {
                    case "potions": 
                        this.storyText.addLine("You have collected a " + potionColorText[item.color] + " potion.");
                        this.player.addItem(item);
                        break;
                    case "scrolls":
                        this.storyText.addLine("You have collected a " + scrollColorText[item.color] + " scroll.");
                        this.player.addItem(item);
                        break;
                    case "gold_piles": 
                        this.storyText.addLine("You have collected " + item.Quantity + " gold.");
                        this.player.gold += item.Quantity;
                        break;
                    default:
                        this.storyText.addLine("You have collected an unkown item: " + item.spriteType);
                        break;
                }
                this.dungeon.removeItem(item);
            })

            this.overlayTexts.forEach((txt) => {txt.update(deltaTime);  })
            this.playerCanvas.update(deltaTime);
        }
        else {
            this.storyText.addLine("Time Jump Avoided: " + deltaTime);
        }
        let playerRoom = this.dungeon.getRoomFromPoint(this.player.getLocation());
        if (playerRoom != null) { this.dungeon.showRoom(playerRoom); }
        else {
            let viewTileBox = this.player.getHitBox();
            viewTileBox.expand(32);
            this.dungeon.showOverlapingTiles(viewTileBox)
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

