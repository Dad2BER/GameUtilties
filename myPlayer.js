import { idle, walking, running, jumping, hurt, dead, meleeAttack } from "./myPlayerStates.js";
import { SkeletonSmall } from "./skeleton.js";
import { RandomNumber } from "./utilities.js";

export class Player extends SkeletonSmall {
    constructor(x,y) {
        super(x,y);
        this.states = [new idle(this), new walking(this), new running(this), new jumping(this), new hurt(this), new dead(this), new meleeAttack(this) ]
        this.currentState = this.states[0];
        this.diceBag = new RandomNumber();
        this.maxHitPoints = 10;
        this.hitPoints = this.maxHitPoints;
        this.gold = 0;
        this.damageModifier = 0;
        this.defenceModifier = 0;
        this.items = [];
    }
    
    handleInput(input) {
        this.currentState.handleInput(input);
    }

    setState(newState) {
        super.setState(newState);
        this.currentState = this.states[newState];
    }

    damagePlayer(damage) {
        this.hitPoints -= damage;
        this.setState(4);
    }

    addItem(item) {
        this.items.push(item);
    }

    isAttacking() {
        return this.currentState == this.states[states.MELEE_ATTACK];
    }

}

