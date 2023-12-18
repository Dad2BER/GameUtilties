/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { TileMap } from "./tileMap.js";

export class MyGame extends Game {
    constructor(canvasID, width, height) {
        super(canvasID, width, height);
        this.player = new Player(200,200);
        this.map = new TileMap(Math.floor(width/32), Math.floor(height/32));
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        this.player.handleInput(this.InputHandler.keys)
        this.player.update(deltaTime);      
        let hitBox = this.player.getHitBox();
        if (this.map.wallCollision(hitBox)) {
            this.player.undoMove();
        } 
        this.draw(this.ctx);
        return true;
    }
    
    draw(context){
        super.draw(context);
        this.map.draw(context);
        this.player.draw(context);
    }
}
