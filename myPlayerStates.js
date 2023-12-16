import { Player } from "./myPlayer.js";
import { states } from "./skeleton.js";
import { direction } from "./sprite_classes/directionSprite.js";

class playerState {
    constructor(state, player) {
        this.state = state;
        this.player = player;
    }

    handleInput(input) {
        let facing = this.player.getDirection();
        let targetFacing = direction.LEFT;
        if (input.includes('ArrowLeft') ) targetFacing = direction.LEFT;
        else if (input.includes('ArrowRight')) targetFacing = direction.RIGHT;
        else if (input.includes('ArrowUp')) targetFacing = direction.UP;
        else if (input.includes('ArrowDown')) targetFacing = direction.DOWN;
        if (targetFacing != this.player.getDirection()) {
            this.player.setDirection(targetFacing);
        }
    }

    containsMovementKeys(input) {
        return input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('ArrowDown') || input.includes('ArrowUp');
    }
}

export class idle extends playerState { 
    constructor(player) { super('IDLE', player); }

    handleInput(input) {
        super.handleInput(input);
        if (this.containsMovementKeys(input)) {
            this.player.setState(states.WALK);
        }
    }
}

export class walking extends playerState {
    constructor(player) { super('WALKING', player); }
    
    handleInput(input) {
        super.handleInput(input);
        if (input.includes('r') && this.containsMovementKeys(input)) {
            this.player.setState(states.RUN);
        }
        else if (input.includes(' ')) {
            this.player.setState(states.JUMP);
        }
        else if (!this.containsMovementKeys(input)) {
            this.player.setState(states.IDLE);
        }
    }
}

export class running extends playerState { 
    constructor(player) { super('RUNNING', player); }
    
    handleInput(input) {
        super.handleInput(input);
        if (input.includes('w') && this.containsMovementKeys(input)) {
            this.player.setState(states.WALK);
        }
        else if (input.includes(' ')) {
            this.player.setState(states.JUMP);
        }
        else if (!this.containsMovementKeys(input)) {
            this.player.setState(states.IDLE);
        }
    }
}

export class jumping extends playerState { 
    constructor(player) { super('jumping', player); }

    handleInput(input) {
        super.handleInput(input);
        if(!input.includes(' ') && this.player.currentSprite.animationFinished) {
            if(this.containsMovementKeys(input)) { this.player.setState(states.RUN); }
            else this.player.setState(states.IDLE);
        }
    }
}

export class hurt extends playerState {
    constructor(player) { super('HURT', player); }
}

export class dead extends playerState {
    constructor(player) { super('DEAD', player); }
}

export class meleeAttack extends playerState {
    constructor(player) { super("MELEE", player); }

    handleInput(input) {
        super.handleInput(input);
    }
}