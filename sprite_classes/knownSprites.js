import { Sprite } from "./sprite.js";

// Skeleton
export class skeletonWalk extends Sprite { constructor(x,y) { super('skeleton_Walk',x,y,128,80,8,15, true); } }
export class skeletonAttack1 extends Sprite { constructor(x,y) {super('skeleton_Attack_1',x,y,128,80,7,15, false); } }
export class skeletonDead extends Sprite { constructor(x,y) {super('skeleton_Dead',x,y,128,80,3,15, true); } }
export class skeletonHurt extends Sprite { constructor(x,y) {super('skeleton_Hurt',x,y,128,80,3,15, false); } }
export class skeletonIdle extends Sprite { constructor(x,y) {super('skeleton_Idle',x,y,128,80,7,15, true);} }
export class skeletonJump extends Sprite { constructor(x,y) {super('skeleton_Jump',x,y,128,80,10,15, false); }  }
export class skeletonRun extends Sprite { constructor(x,y) {super('skeleton_Run',x,y,128,80,7,15, true);} }

