import { Player } from "./myPlayer.js";
import { spriteActions, spriteFacing } from "./sprite_classes/actionSprite.js";

class playerState {
    constructor(state, player) {
        this.state = state;
        this.player = player;
    }

    handleInput(input) {
        let targetFacing = null;
        if (input.includes('ArrowLeft') ) targetFacing = spriteFacing.LEFT;
        else if (input.includes('ArrowRight')) targetFacing = spriteFacing.RIGHT;
        else if (input.includes('ArrowUp')) targetFacing = spriteFacing.UP;
        else if (input.includes('ArrowDown')) targetFacing = spriteFacing.DOWN;
        if (targetFacing != null && this.player.getDirection() != targetFacing) {
            this.player.setDirection(targetFacing);
        }
    }

    containsMovementKeys(input) {
        return input.includes('ArrowLeft') || input.includes('ArrowRight') || input.includes('ArrowDown') || input.includes('ArrowUp');
    }
}

export class idle extends playerState { 
    constructor(player) { super(spriteActions.IDLE, player); }

    handleInput(input) {
        super.handleInput(input);
        if (this.containsMovementKeys(input)) {
            this.player.setState(spriteActions.WALK);
        }
        else if (input.includes('a')) {
            this.player.setState(spriteActions.ATTACK);
        }
    }
}

export class walking extends playerState {
    constructor(player) { super(spriteActions.WALK, player); }
    
    handleInput(input) {
        super.handleInput(input);
        if (input.includes('a')) {
            this.player.setState(spriteActions.ATTACK);
        }
        else if (!this.containsMovementKeys(input)) {
            this.player.setState(spriteActions.IDLE);
        }
    }
}

export class hurt extends playerState {
    constructor(player) { 
        super(spriteActions.HURT, player); 
    }
    
    handleInput(input) {
        if (this.player.animationFinished && this.player.endAnimationDelay< 0) { 
            this.player.setState(spriteActions.IDLE);
        }
    }
}

export class dead extends playerState {
    constructor(player) { super(spriteActions.DEAD, player); }
}

export class meleeAttack extends playerState {
    constructor(player) { 
        super(spriteActions.ATTACK, player); 
    }

    handleInput(input) {
        super.handleInput(input);
        if (this.player.animationFinished && this.player.endAnimationDelay< 0) { 
            this.player.setState(spriteActions.IDLE);
        }
    }
}