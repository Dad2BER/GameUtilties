/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { Dungeon } from "./dungeon.js";


export class MyGame extends Game {
    constructor(canvasID, width, height) {
        super(canvasID, width, height);
        this.dungeon = new Dungeon(Math.floor(width/32), Math.floor(height/32),1);
        let firstRoom = this.dungeon.getRoom(0,0);
        this.player = new Player(firstRoom.x + Math.floor(firstRoom.width/2),
                                      firstRoom.y+Math.floor(firstRoom.height/2));
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        this.player.handleInput(this.InputHandler.keys)
        this.player.update(deltaTime);
        this.dungeon.adjustMovingObject(this.player);
        this.draw(this.ctx);
        return true;
    }
    
    draw(context){
        super.draw(context);
        this.dungeon.draw(context);
        this.player.draw(context);
    }
}
