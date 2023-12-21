import { Sprite, RandomeSpirte, AnimatedSprite } from "./sprite.js";

// Skeleton
export class skeletonWalkLeft extends AnimatedSprite { constructor(x,y) { super('skeleton_Walk_Left',x,y,128,80,8,15, true); } }
export class skeletonWalkRight extends AnimatedSprite { constructor(x,y) { super('skeleton_Walk_Right',x,y,128,80,8,15, true); } }
export class skeletonAttack1 extends AnimatedSprite { constructor(x,y) {super('skeleton_Attack_1',x,y,128,80,7,15, false); } }
export class skeletonDead extends AnimatedSprite { constructor(x,y) {super('skeleton_Dead',x,y,128,80,3,15, true); } }
export class skeletonHurt extends AnimatedSprite { constructor(x,y) {super('skeleton_Hurt',x,y,128,80,3,15, false); } }
export class skeletonIdle extends AnimatedSprite { constructor(x,y) {super('skeleton_Idle',x,y,128,80,7,15, true);} }
export class skeletonJump extends AnimatedSprite { constructor(x,y) {super('skeleton_Jump',x,y,128,80,10,15, false); }  }
export class skeletonRun extends AnimatedSprite { constructor(x,y) {super('skeleton_Run',x,y,128,80,7,15, true);} }
// Small Skeleton
export class skeletonWalkLeftSmall extends AnimatedSprite {constructor(x,y) {super('skeleton_Walk_Left_Small', x, y, 32,32,8,15, true);}}
export class skeletonWalkRightSmall extends AnimatedSprite {constructor(x,y) {super('skeleton_Walk_Right_Small', x, y, 32,32,8,15, true);}}
export class skeletonIdleSmall extends AnimatedSprite {constructor(x,y) {super('skeleton_Idle_Small', x, y, 32,32,7,15, true);}}
export class skeletonAttack1Small extends AnimatedSprite { constructor(x,y) {super('skeleton_Attack_1',x,y,128,80,7,15, false); } }
export class skeletonDeadSmall extends AnimatedSprite { constructor(x,y) {super('skeleton_Dead',x,y,128,80,3,15, true); } }
export class skeletonHurtSmall extends AnimatedSprite { constructor(x,y) {super('skeleton_Hurt',x,y,128,80,3,15, false); } }
export class skeletonJumpSmall extends AnimatedSprite { constructor(x,y) {super('skeleton_Jump',x,y,128,80,10,15, false); }  }
export class skeletonRunSmall extends AnimatedSprite { constructor(x,y) {super('skeleton_Run',x,y,128,80,7,15, true);} }

//Dugeon
export class randomeBrickBrown extends RandomeSpirte { constructor(x,y) {super('brick_brown',x,y,32,32,8)}}
export class randomGrayFloor extends RandomeSpirte { 
    constructor(x,y) {
        super('floor_gray',x,y,32,32,4);
        this.solid = false;
}}
export class doorHorizontal extends Sprite { constructor(x,y) {super('door',x,y,32,32,2,0,0)}}