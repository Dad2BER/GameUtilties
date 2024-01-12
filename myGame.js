/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeonClasses/dungeon.js";
import { playerDamageText, monsterDamageText, statusText, youDiedText } from "./text.js";
import { Point, RandomNumber, direction } from "./utilities.js";
import { PlayerCanvas } from "./playerCanvas.js";
import { StoryText } from "./storyText.js";
import { Potion, PotionDictionary, potionColorText, potionEffect, potionEffectText, potionNumberEffects} from "./dungeonClasses/potion.js";
import { Scroll, ScrollDictionary, scrollColorText, scrollEffect, scrollEffectText, scrollNumberEffects } from "./dungeonClasses/scroll.js";
import { BackGround } from "./sprite_classes/background.js";
import { CookieHandler, HighScore } from "./cookie.js";
import { binary, fireBall, helpScreen } from "./sprite_classes/knownSprites.js";


export class MyGame extends Game {
    constructor(mapCanvasID, playerCanvasID, storyTextAreaID, width, height) {
        super(mapCanvasID, width, height);
        this.cookie = new CookieHandler();
        this.overlayTexts = [];
        this.diceBag = new RandomNumber();
        this.potionDictionary = new PotionDictionary();
        this.scrollDictionary = new ScrollDictionary();
        this.backGround = new BackGround('light_cloud', 'dark_cloud', width, height);
        this.player = new Player(0,0); //Does not matter where, because popualteLevel will move them.
        this.playerCanvas = new PlayerCanvas(this.player, playerCanvasID, this.potionDictionary, this.scrollDictionary);
        this.storyText = new StoryText(storyTextAreaID);
        this.storyText.addLine("");
        this.storyText.addLine("Skeleton used for player comes from FREE FANTASY ENEMIES PIXEL ART SPRITE PACK at graphpix.net");
        this.storyText.addLine("Dungeon graphics come from dungeon crawl tiles at OpenGameArt.org")
        this.storyText.addLine("");
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),3,this.potionDictionary, this.scrollDictionary);
        this.dungeon.addPlayer(this.player);
        this.player.show();
        this.readyForInput = true;
        let cookieRunCount = this.cookie.getCookie("runCount");
        this.runCount = 0;
        if (cookieRunCount > 0) { this.runCount = cookieRunCount; }
        this.runCount++;
        this.cookie.setCookie("runCount", this.runCount, 90);
       //this.cookie.clearTop10();
        //this.cookie.setTop10( new HighScore(this.runCount, "Hello", this.diceBag.intBetween(1,100), null) );
        this.cookie.logCookies();
        this.helpScreen = new helpScreen(width/2, height/2);
        this.helpScreen.show();
        this.youDiedText = null;
        this.rangeAttacks = [];
    }
    
    handleInput() {
        if (this.player.hitPoints > 0) {
            let keys = this.InputHandler.keys;
            this.player.handleInput(keys); // Arrow keys
            this.playerCanvas.handleInput(keys); // 'p' and 's'
            if ( this.InputHandler.useKey('q')) { this.quaffPotion(); }
            if ( this.InputHandler.useKey('r') ) { this.readScroll(); }
            if ( this.InputHandler.useKey('d') ) { this.useStairs(true); }
            if ( this.InputHandler.useKey('u') ) { this.useStairs(false); }
        }
        if ( this.InputHandler.useKey('?') || this.InputHandler.useKey('Escape') ) {  this.helpScreen.isVisible() ? this.helpScreen.hide() : this.helpScreen.show();  }
        if ( this.InputHandler.useKey('m') ) { this.dungeon.showLevel();} //Debug command to show the level
        if ( this.InputHandler.useKey('!') ) { 
            this.potionDictionary.potions.forEach((potion) => {
                this.player.addItem(new Potion(0,0,potion.color, potion.effect));
            })
            this.scrollDictionary.scrolls.forEach((scroll) => {
                this.player.addItem(new Scroll(0,0,scroll.color, scroll.effect));
            })
        }
    }

    useStairs(goDown) {
        let stairs = this.dungeon.stairCollisions(this.player.getHitBox());
        let used = false;
        stairs.forEach((stair) => { 
            if (goDown && stair.frameX == binary.DOWN) {
                used = true;
                this.dungeon.goDown(this.player);
            }
            else if (goDown == false && stair.frameX == binary.UP) {
                used = true;
                this.dungeon.goUp(this.player);                
            }
        })
        return used;
    }

    quaffPotion() {
        let effect = this.playerCanvas.quaffPotion();
        if (effect != null) {
            this.storyText.addLine("You drank a " + potionEffectText[effect] + " potion.");
            if (effect == potionEffect.RANDOM) {
                this.storyText.addLine("Wild uncontrollable things happen...");
                while (effect == potionEffect.RANDOM) { effect = this.diceBag.intBetween(1, potionNumberEffects); } //Now we pick something else
            }
            switch(effect) {
                case potionEffect.DEXTARITY:
                    this.storyText.addLine("Your dodge skills imporve, you will take less damage.");
                    this.player.defenceModifier += 1;
                    break;
                case potionEffect.HEAL:
                    let heal = this.diceBag.intBetween(1, 6);
                    if (this.player.maxHitPoints - this.player.hitPoints < heal) {
                        heal = this.player.maxHitPoints - this.player.hitPoints;
                    }
                    this.storyText.addLine("You are healed for " + heal + " points.");
                    this.player.hitPoints += heal;
                    break;
                case potionEffect.POISON:
                    let damage = this.diceBag.intBetween(1, 4);
                    this.storyText.addLine("You took " + damage + " damage.");
                    this.player.hitPoints -= damage;
                    this.isPlayerDead("You drank yourself to death.");
                    break;
                case potionEffect.STRENGTH:
                    this.storyText.addLine("You are stronger, you will do more damage.");
                    this.player.damageModifier += 1;
                    break;
            }    
        }
        else {
            this.storyText.addLine("You don't have any potions to drink.")
        }
    }

    readScroll() {
        let effect = this.playerCanvas.readScroll();
        if (effect != null) {
            this.storyText.addLine("You read a " + scrollEffectText[effect] + " scroll");
            if (effect == scrollEffect.RANDOM) {
                this.storyText.addLine("Wild uncontrollable things happen...");
                while (effect == scrollEffect.RANDOM) { effect = this.diceBag.intBetween(1, scrollNumberEffects); } //Now we pick something else
            }
            switch (effect) {
                case scrollEffect.IDENTIFY:
                    this.storyText.addLine("You understand a little more magic...");
                    let item = this.playerCanvas.identifyItem();
                    if (item != null) {
                        switch(item.spriteType) {
                            case 'potions':
                                this.storyText.addLine("You know that " + potionColorText[item.color] + 
                                                        " are " + potionEffectText[item.effect] + " potions");
                                break;
                            case 'scrolls':
                                this.storyText.addLine("You know that " + scrollColorText[item.color] + 
                                                        "are " + scrollEffectText[item.effect] + " scrolls");
                                break;
                            default:
                                this.storyText.addLine("I don't know what you identified: " + item.spriteType);
                                break;
                        }
                    }
                    break;
                case scrollEffect.FIREBALL:
                    this.storyText.addLine("Fire courses though your hands...");
                    let fb = new fireBall(this.player.x, this.player.y, this.player.facing, 50);
                    fb.show();
                    this.rangeAttacks.push( fb );
                    break;
                case scrollEffect.MAP:
                    this.storyText.addLine("It looks to be a map to this level of the dungeon.");
                    let random = this.diceBag.d10();
                    if (random < 6) {
                        this.storyText.addLine("You can now see all the rooms, doors, and stairs.");
                        this.dungeon.showLevelDetail(true, false, false, false, false, false);
                    }
                    else if (random < 8) {
                        this.storyText.addLine("The map includes where treasure chests are.");
                        this.dungeon.showLevelDetail(true, false, true, false, false, false);
                    }
                    else if (random < 9) {
                        this.storyText.addLine("The map is recent and includes all treasure.");
                        this.dungeon.showLevelDetail(true, false, true, true, true, true);
                    }
                    else {
                        this.storyText.addLine("The map is magic and shows everything.");
                        this.dungeon.showLevelDetail(true, true, true, true, true, true);
                    }
                    break;
                case scrollEffect.CURSE:
                    this.storyText.addLine("Life sucks...you feel weaker.")
                    this.player.damageModifier -= 1;
                    break;
            }
        }
        else {
            this.storyText.addLine("You don't have any scrolls to read.")
        }
    }

    updateCombat() {
        let monsters = this.dungeon.monsterCollisions(this.player.getHitBox());
        monsters.forEach((monster)=> { 
            //Notice that the player can only attack monsters they overlap with, so this is a mele attack
            //Also the canAttack will get set to false after the first attack so player will only attack the first monster
            //Also the player always gets initiative, so if the player hits the monster the monster resets cooldown 
            //                                                and thus canAttack for the monster will retrun fallse
            if (this.player.isAttacking()) { 
                let playerDamage = this.player.attack(monster);
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
            if (monster.canAttack() && this.player.hitPoints > 0) { //If the monster can attack then it does
                monster.show(); //Make sure the monster is not visible to the player.
                let damage = monster.meleAttack() - this.player.defenceModifier;
                if (damage > 0) {
                    this.overlayTexts.push( new monsterDamageText(damage , monster.getLocation()) );
                    this.storyText.addLine("Rat did " + damage + " damage to you!");
                    this.player.damagePlayer(damage);
                    this.isPlayerDead("You were killed by a rat.");
                }
                else {
                    this.overlayTexts.push( new monsterDamageText("0" , monster.getLocation()) );
                    this.storyText.addLine("Rat attacked and missed.");
                }
            }
        })
    }

    updateChests() {
        let chests = this.dungeon.chestCollisions(this.player.getHitBox());
        chests.forEach((chest)=> {
            if (!chest.isOpen) { 
                this.dungeon.openChest(chest);
                this.overlayTexts.push( new statusText("Open" , chest.getLocation()) );
                this.storyText.addLine("You open a chest...");
            }
        }) 
    }

    updateItems() {
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
    }

    updateRangeAttacks(deltaTime) {
        this.rangeAttacks.forEach((missle) => {
            missle.update(deltaTime);
            let hitMosters = this.dungeon.monsterCollisions(missle.getHitBox());
            hitMosters.forEach((monster, index) => {
                this.storyText.addLine("Fireball hit " + index + " of " + hitMosters.length + " Rats.");
            })
            let mapTiles = this.dungeon.getOverlapTiles(missle.getHitBox());
            mapTiles.forEach((tile) => {
                if (tile.solid) {
                    this.storyText.addLine("Fireball explodes as it hits a wall.");
                    missle.markedForDeletion = true;
                }
            })
        })
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        if (deltaTime < 1000) { //The browser pauses the animation loop when we are not the focus, so ignore large time jumps
            this.backGround.update(deltaTime);
            this.handleInput();
            this.player.update(deltaTime); //This allows the player to move and animate, but we may reset them later
            this.dungeon.update(deltaTime); //This allows all the monsters to move and animations to run
            this.dungeon.openHitDoor(this.player.getHitBox());
            this.dungeon.adjustMovingObject(this.player);
            //Dungeon maintains the animations of these, we are just checking for interactoin
            this.updateCombat();  //Monster attacks and Player Attacks
            this.updateChests();  //Open Chests
            this.updateItems();   //Pick Up Items
            //Check on fireball updates
            this.updateRangeAttacks(deltaTime); 
            this.overlayTexts.forEach((txt) => {txt.update(deltaTime);  })
            this.playerCanvas.update(deltaTime);
        }
        let playerRoom = this.dungeon.getRoomFromPoint(this.player.getLocation());
        if (playerRoom != null) { this.dungeon.showRoom(playerRoom); }
        else {
            let viewTileBox = this.player.getHitBox();
            viewTileBox.expand(31);
            this.dungeon.showOverlapingTiles(viewTileBox)
        }
        if (this.youDiedText != null) { this.youDiedText.update(deltaTime); }
        this.draw(this.ctx);
        return true;
    }

    isPlayerDead(message) {
        if (this.player.hitPoints <= 0) {
            this.storyText.addLine(message);
            this.youDiedText = new youDiedText("You Died!!!!", new Point(this.canvas.width/2, this.canvas.height/2));
            let top10 = this.cookie.setTop10( new HighScore("Player", message, this.player.gold, null) );
            top10.forEach((entry) => {
                console.log(entry.playerName + " " + entry.comment + " " + entry.score);
            })
        }
    }
    
    draw(context){
        super.draw(context);
        this.backGround.draw(context);
        this.dungeon.draw(context);
        this.overlayTexts.forEach((txt, index) => { 
            txt.draw(context); 
            if (txt.markedForDeletion) { this.overlayTexts.splice(index, 1);}
        })
        this.player.draw(context);
        this.rangeAttacks.forEach((missle, index) => { 
            missle.draw(context); 
            if (missle.markedForDeletion) {
                this.rangeAttacks.splice(index, 1);
            }
        })
        if (this.helpScreen != null) { this.helpScreen.draw(context, false);}
        if (this.youDiedText != null) { this.youDiedText.draw(context); }
    }

}

