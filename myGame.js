/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeon.js";
import { rat, ratSubtype } from "./monster.js";


export class MyGame extends Game {
    constructor(canvasID, width, height) {
        super(canvasID, width, height);
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),1);
        this.player = new Player(0,0); //Does not matter where, because popualteLevel will move them.
        this.monsters = [];
        this.populateLevel(0);
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        this.player.handleInput(this.InputHandler.keys)
        this.player.update(deltaTime);
        this.dungeon.openHitDoor(this.player.getHitBox());
        this.dungeon.adjustMovingObject(this.player);
        this.monsters.forEach((monster)=> { monster.update(timeStamp); })
        this.draw(this.ctx);
        return true;
    }
    
    draw(context){
        super.draw(context);
        this.dungeon.draw(context);
        this.player.draw(context);
        this.monsters.forEach((monster)=> { monster.draw(context,false); })
    }

    populateLevel(levelIndex) {
        let rooms = this.dungeon.getLevelRooms(levelIndex);
        this.player.setLocation(rooms[0].x + Math.floor(rooms[0].width/2),
                                rooms[0].y + Math.floor(rooms[0].height/2));
        for(let i=1; i<rooms.length; i++) {
            let x = this.randomNUmber.intBetween(rooms[i].x, rooms[i].x+rooms[i].width-32)+16;
            let y = this.randomNUmber.intBetween(rooms[i].y, rooms[i].y+rooms[i].height-32)+16;
            this.monsters.push(new rat(x,y,ratSubtype.BROWN));
        }
    }

}
