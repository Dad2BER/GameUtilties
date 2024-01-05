import { idle, walking, hurt, dead, meleeAttack } from "./myPlayerStates.js";
import { RandomNumber } from "./utilities.js";
import { ActionSprite, spriteActions} from "./sprite_classes/actionSprite.js";

export class Player extends ActionSprite {
    constructor(x,y) {
        super('skeleton_sheet_small',x,y,32,32,30);
        this.states = [new walking(this), new meleeAttack(this), new idle(this), 
                       new hurt(this), new dead(this) ]
        this.setState(spriteActions.IDLE);
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
        this.setState(spriteActions.HURT);
    }

    addItem(item) {
        this.items.push(item);
    }

    isAttacking() {
        return this.currentState == this.states[spriteActions.ATTACK];
    }

}

