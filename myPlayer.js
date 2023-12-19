import { idle, walking, running, jumping, hurt, dead, meleeAttack } from "./myPlayerStates.js";
import { SkeletonSmall } from "./skeleton.js";

export class Player extends SkeletonSmall {
    constructor(x,y) {
        super(x,y);
        this.states = [new idle(this), new walking(this), new running(this), new jumping(this), new hurt(this), new dead(this), new meleeAttack(this) ]
        this.currentState = this.states[0];
    }
    
    handleInput(input) {
        this.currentState.handleInput(input);
    }

    setState(newState) {
        super.setState(newState);
        //this.setSprite(newState);
        this.currentState = this.states[newState];
    }
}

