import { InputHandler } from "./input.js";
export class Game {
    //Every game has a canvas, width and height
    constructor(canvasID, width, height){
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.lastTime = 0;
        this.InputHandler = new InputHandler();
    }
    
    //The main application is responsible for calling update in the animate loop
    update(timeStamp) {
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        return deltaTime;
    }
    //The only thing the base game class does is clear the canvas to make it ready to draw on
    draw(context) {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}