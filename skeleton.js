import { skeletonIdle, skeletonWalkLeft, skeletonWalkRight, 
         skeletonRun, skeletonJump, skeletonHurt, skeletonDead, skeletonAttack1,
         skeletonIdleSmall, skeletonWalkLeftSmall, skeletonWalkRightSmall,
         skeletonRunSmall, skeletonJumpSmall, skeletonHurtSmall, skeletonDeadSmall, skeletonAttack1Small
         } from "./sprite_classes/knownSprites.js";
import { MovingSprite } from "./sprite_classes/movingSprite.js";
import { HitBox, direction } from "./utilities.js";

export const states = { IDLE: 0, WALK: 1, RUN: 2, JUMP: 3, HURT: 4, DEAD: 5, MELEE_ATTACK: 6 };

//Large Seketon
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

// Small Skeleton
class idleSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonIdleSmall(x,y), new skeletonIdleSmall(x,y), 
              new skeletonIdleSmall(x,y), new skeletonIdleSmall(x,y), 
              direction.LEFT, 0); }
}

class walkingSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonWalkLeftSmall(x,y), new skeletonWalkRightSmall(x,y), 
              new skeletonWalkLeftSmall(x,y), new skeletonWalkRightSmall(x,y), 
              direction.LEFT, 50); }
}

class runningSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonRunSmall(x,y), new skeletonRunSmall(x,y), 
             new skeletonRunSmall(x,y), new skeletonRunSmall(x,y), 
             direction.LEFT, 100); }
}

class jumpingSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonJumpSmall(x,y), new skeletonJumpSmall(x,y), 
              new skeletonJumpSmall(x,y), new skeletonJumpSmall(x,y), 
              direction.LEFT, 100); }
}

class hurtingSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonHurtSmall(x,y), new skeletonHurtSmall(x,y), 
              new skeletonHurtSmall(x,y), new skeletonHurtSmall(x,y), 
              direction.LEFT, 0); }
}

class deadSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonDeadSmall(x,y), new skeletonDeadSmall(x,y), 
              new skeletonDeadSmall(x,y), new skeletonDeadSmall(x,y), 
              direction.LEFT, 0); }
}

class meleeAttaackingSkeletonSmall extends MovingSprite {
    constructor(x,y) { 
        super(new skeletonAttack1Small(x,y), new skeletonAttack1Small(x,y), 
              new skeletonAttack1Small(x,y), new skeletonAttack1Small(x,y), 
              direction.LEFT, 0); }
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
    }

    getDirection() {
        return this.currentStateSprite.getDirection();
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

    adjustLocation(deltaX,deltaY) {
        this.currentStateSprite.adjustLocation(deltaX, deltaY);
    }

    setLocation(x,y) {
        this.currentStateSprite.setLocation(x, y);
    }

}

export class SkeletonSmall extends Skeleton {
    constructor(x,y) {
        super(x,y);
        this.stateSpriteList = [new idleSkeletonSmall(x,y), new walkingSkeletonSmall(x,y), new runningSkeletonSmall(x,y), 
                               new jumpingSkeletonSmall(x,y), new hurtingSkeletonSmall(x,y), new deadSkeletonSmall(x,y), 
                               new meleeAttaackingSkeletonSmall(x,y)];
        this.currentStateSprite = this.stateSpriteList[0];
    }
}