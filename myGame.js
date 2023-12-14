/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";

export class MyGame extends Game {
    constructor(canvasID, width, height) {
        super(canvasID, width, height);
    }
    update(timestamp) {
        super.update(timestamp);
        this.draw();
        return true;
    }
    
    draw(){
        super.draw();
    }
}
