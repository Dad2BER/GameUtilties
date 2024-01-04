import { AnimatedSprite } from "./sprite.js";


// Action Spirtes have a known set of actions in the sprite sheet:
// 4 rows of Walking (4 directions:  Left, Right, Up, Down )
// 4 rows of Attacking (4 directions: Left Right, Up, Down )
// 1 row of Idel
// 1 row of Hurt
// 1 row ot Die
export const spriteActions = {WALK: 0, ATTACK: 4, IDLE: 8, HURT: 9, DIE: 10};
export const spriteFacing = {LEFT:0, RIGHT:1, UP:2, DOWN:3};

// For more flexiiblity we could pass this in, but for now the number of animation frames
// is hard codded to the following
const maxActionFrames = {WALK: 8, ATTACK: 7, IDLE: 7, HURT: 3, DIE: 6};

//The big refacgtor improvement is now the palyer is just another sprite and not a collection of sprites
export class ActionSprite extends AnimatedSprite{
    constructor(spriteSheetID, x, y, width, height, speed) {
        super(spriteSheetID, x, y, width, height, maxActionFrames.IDLE, 10, true);
        this.setAction(ActionSprite.IDLE);
        this.setAction(spriteActions.IDLE);
        this.facing = spriteFacing.LEFT;
        //handle movement variables as pixels per second
        this.speed = speed/1000.0; //Convert speed to delta time milliseconds-009p
    }

    setAction(newAction) {
        this.action = newAction;
        this.frameX = 0;
        if (newAction == spriteActions.WALK || newAction == spriteActions.ATTACK) {
            this.frameY = newAction + this.facing;
        } 
        else {
            this.frameY = newAction;
        }
    }

    setDirection(newDirection) {
        this.vx = 0;
        this.vy = 0;
        if (newDirection == spriteActions.WALK || newDirection == spriteActions.ATTACK) {
            switch(this.facing) {
                case spriteFacing.LEFT: this.vx = -this.speed; break;
                case spriteFacing.RIGHT: this.vx = this.speed; break;
                case spriteFacing.UP: this.vy = -this.speed; break;
                case spriteFacing.DOWN: this.vy = this.speed; break;
                default: this.vx = 0; this.vy = 0; break;
            }
        }
        this.facing = newDirection;
    }

    getDirection() {
        return this.facing;
    }

}