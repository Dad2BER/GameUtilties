import { states, direction } from "./skeleton.js";

class playerState {
    constructor(state, player) {
        this.state = state;
        this.player = player;
    }

}

export class idle extends playerState { 
    constructor(player) { super('IDLE', player); }

    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.WALK);
        }
    }
}

export class walking extends playerState {
    constructor(player) { super('WALKING', player); }
    
    handleInput(input) {
        if ((input.includes('ArrowLeft') && this.player.facing == direction.RIGHT) || (input.includes('ArrowRight') && this.player.facing == direction.LEFT) ) {
            this.player.flipHorizontalDirection();
        }
        else if (input.includes('r') && (input.includes('ArrowLeft') || input.includes('ArrowRight'))) {
            this.player.setState(states.RUN);
        }
        else if (input.includes(' ')) {
            this.player.setState(states.JUMP);
        }
        else if (!input.includes('ArrowLeft') && !input.includes('ArrowRight')) {
            this.player.setState(states.IDLE);
        }
    }
}

export class running extends playerState { 
    constructor(player) { super('RUNNING', player); }
    
    handleInput(input) {
        if ((input.includes('ArrowLeft') && this.player.facing == direction.RIGHT) ||
            (input.includes('ArrowRight') && this.player.facing == direction.LEFT) ) {
            this.player.flipHorizontalDirection();
        }
        else if (input.includes('w') && (input.includes('ArrowLeft') || input.includes('ArrowRight'))) {
            this.player.setState(states.WALK);
        }
        else if (input.includes(' ')) {
            this.player.setState(states.JUMP);
        }
        else if (!input.includes('ArrowLeft') && !input.includes('ArrowRight')) {
            this.player.setState(states.IDLE);
        }
    }
}

export class jumping extends playerState { 
    constructor(player) { super('jumping', player); }

    handleInput(input) {
        if(!input.includes('space')) {
            if(input.includes('ArrowLeft') || input.includes('ArrowRight')) { this.player.setState(states.RUN); }
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
}