import { skeletonIdle, skeletonWalkLeft, skeletonWalkRight, 
         skeletonRun, skeletonJump, skeletonHurt, skeletonDead, skeletonAttack1 } from "./sprite_classes/knownSprites.js";
import { MovingSprite } from "./sprite_classes/movingSprite.js";
import { direction } from "./sprite_classes/directionSprite.js";
import { HitBox } from "./utilities.js";

export const states = { IDLE: 0, WALK: 1, RUN: 2, JUMP: 3, HURT: 4, DEAD: 5, MELEE_ATTACK: 6 };

class idleSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonIdle(x,y), new skeletonIdle(x,y), 
                             new skeletonIdle(x,y), new skeletonIdle(x,y), 
                             direction.LEFT, 0); }
}

class walkingSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonWalkLeft(x,y), new skeletonWalkRight(x,y), 
                             new skeletonWalkLeft(x,y), new skeletonWalkRight(x,y), 
                             direction.LEFT, 50); }
}

class runningSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonRun(x,y), new skeletonRun(x,y), new skeletonRun(x,y), new skeletonRun(x,y), direction.LEFT, 100); }
}

class jumpingSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonJump(x,y), new skeletonJump(x,y), new skeletonJump(x,y), new skeletonJump(x,y), direction.LEFT, 100); }
}

class hurtingSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonHurt(x,y), new skeletonHurt(x,y), new skeletonHurt(x,y), new skeletonHurt(x,y), direction.LEFT, 0); }
}

class deadSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonDead(x,y), new skeletonDead(x,y), new skeletonDead(x,y), new skeletonDead(x,y), direction.LEFT, 0); }
}

class meleeAttaackingSkeleton extends MovingSprite {
    constructor(x,y) { super(new skeletonAttack1(x,y), new skeletonAttack1(x,y), new skeletonAttack1(x,y), new skeletonAttack1(x,y), direction.LEFT, 0); }
}


export class Skeleton  {
    constructor(x,y) {
        this.stateSpriteList = [new idleSkeleton(x,y), new walkingSkeleton(x,y), new runningSkeleton(x,y), new jumpingSkeleton(x,y), 
                           new hurtingSkeleton(x,y), new deadSkeleton(x,y), new meleeAttaackingSkeleton(x,y)];
        this.currentStateSprite = this.stateSpriteList[0];
    }
    
    update(deltaTime) {
        this.currentStateSprite.update(deltaTime);
    }
    
    draw(context, drawHitBox) {
        this.currentStateSprite.draw(context, drawHitBox);
    }

    setDirection(newDirection) {
        this.currentStateSprite.setDirection(newDirection);
        console.log("NewDirection: " + newDirection);
    }

    getDirection() {
        return this.currentStateSprite.facing;
    }
    
    setState(newState){
        this.stateSpriteList[newState].setLocation(this.currentStateSprite.x, this.currentStateSprite.y);
        this.currentStateSprite = this.stateSpriteList[newState];
    }

    getHitBox() {
        return this.currentStateSprite.getHitBox();
    }

    undoMove() {
        this.currentStateSprite.undoMove();
    }

}