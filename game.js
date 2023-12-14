export class Game {
    //Every game has a canvas, width and height
    constructor(canvasID, width, height){
        this.canvas = document.getElementById(canvasID);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = width;
        this.canvas.height = height;
        this.lastTime = 0;
        this.deltaTime = 0;
    }
    //The main application is responsible for calling update in the animate loop
    update(timeStamp) {
        this.deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
    }
    //The only thing the base game class does is clear the canvas to make it ready to draw on
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}