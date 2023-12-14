/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Skeleton } from "./skeleton.js";
import { Player } from "./myPlayer.js";

export class MyGame extends Game {
    constructor(canvasID, width, height) {
        super(canvasID, width, height);
        this.skeletons = [new Skeleton(100, 100)]
        this.player = new Player(200,200);
    }
    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        this.skeletons.forEach(skeleton => {
            skeleton.update(deltaTime);
        });
        this.player.handleInput(this.InputHandler.keys)
        this.player.update(timeStamp);       
        this.draw(this.ctx);
        return true;
    }
    
    draw(context){
        super.draw(context);
        this.skeletons.forEach(skeleton => {
            skeleton.draw(context, true);
        });
        this.player.draw(context);
    }
}
