import { DirectionSprite, direction } from "./directionSprite.js";

export class MovingSprite extends DirectionSprite {
    constructor(leftSprite, rightSprite, upSprite, downSprite, facing, speed) {
        super(leftSprite, rightSprite, upSprite, downSprite, facing);
        //handle movement variables as pixels per second
        this.speed = speed/1000.0; //Convert speed to delta time milliseconds
        this.moveTimer = 0;
        this.vx = 0;
        this.vy = 0;
    }

    setDirection(newDirection) {
        super.setDirection(newDirection);
        this.vx = 0;
        this.vy = 0;
        switch(this.facing) {
            case direction.LEFT: this.vx = -this.speed; break;
            case direction.RIGHT: this.vx = this.speed; break;
            case direction.UP: this.vy = -this.speed; break;
            case direction.DOWN: this.vy = this.speed; break;
            default: this.vx = 0; this.vy = 0; break;
        }
        console.log("Direction: " + newDirection + "   dx: " + this.vx + "   dy: " + this.vy);
    }

    update (deltaTime) {
        super.update(deltaTime);
        this.setLocation(this.x + this.vx*deltaTime, this.y + this.vy*deltaTime);
    }

}