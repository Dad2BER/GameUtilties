import { skeletonIdle, skeletonWalk, skeletonRun, skeletonJump, skeletonHurt, skeletonDead, skeletonAttack1 } from "./knownSprites.js";

export const states = { IDLE: 0, WALK: 1, RUN: 2, JUMP: 3, HURT: 4, DEAD: 5, MELEE_ATTACK: 6 };
export const direction = {LEFT: 0, RIGHT: 1};

export class Skeleton {
    constructor(x,y) {
        this.spriteList = [new skeletonIdle(x,y), new skeletonWalk(x,y), new skeletonRun(x,y), new skeletonJump(x,y), 
                           new skeletonHurt(x,y), new skeletonDead(x,y), new skeletonAttack1(x,y)];
        this.currentSprite = this.spriteList[0];
        this.facing = direction.RIGHT;
    }
    
    update(deltaTime) {
        this.currentSprite.update(deltaTime);
    }
    
    draw(context, drawHitBox) {
        this.currentSprite.draw(context, drawHitBox);
    }
    
    setState(newState){
        let X = this.currentSprite.x;
        let Y = this.currentSprite.y;
        let flip = this.currentSprite.flipHorizontal;
        this.currentSprite = this.spriteList[newState];
        this.currentSprite.restartArnimation();
        this.currentSprite.changeLocation(X, Y);
        this.currentSprite.flipHorizontal = flip;
        let speed = 0;
        switch(newState) {
            case states.WALK: speed = 5; break;
            case states.RUN: speed = 10; break;
            case states.JUMP: speed = 10; break;
            default: speed = 0;
        }
        if (this.facing === direction.LEFT) { 
            speed *= -1; 
        }
        this.currentSprite.vx = speed;
    }
    
    flipHorizontalDirection() {
        this.facing = this.facing==direction.LEFT ? direction.RIGHT : direction.LEFT;
        this.currentSprite.flipHorizontal = !this.currentSprite.flipHorizontal;
        this.currentSprite.vx *= -1;
    }
}