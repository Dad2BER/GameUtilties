import { direction, Point } from "../dungeonClasses/utilities.js";

export class DirectionSprite {
    constructor(leftSprite, rightSprite, upSprite, downSprite, facing) {
        this.sprites = [leftSprite, rightSprite, upSprite, downSprite];
        this.facing = facing;
        this.x = this.sprites[this.facing].x;
        this.y = this.sprites[this.facing].y;
        this.visible = false;
    }

    isVisible() { return this.visible; }
    show() { 
        this.visible = true;
        this.sprites.forEach((sprite) => {sprite.show(); } )
    }
    hide() { 
        this.visible = false;
        this.sprites.forEach((sprite) => {sprite.hide(); })
    }

    setLocation(x,y) {
        this.x = x;
        this.y = y;
        this.sprites.forEach(sprite => {
            sprite.setLocation(x, y);
        });
    }

    getLocation() {
        return new Point(this.x, this.y);
    }

    getDirection() {
        return this.facing;
    }
    
    setDirection(newDirection) {
        this.facing = newDirection;
        if (this.sprites[this.facing].maxFrames > 1) { this.sprites[this.facing].restartArnimation(); }
    }

    move(deltaX,deltaY) {
        this.setLocation(this.x + deltaX, this.y + deltaY);
    }

    update(deltaTime) {
        this.sprites[this.facing].update(deltaTime);
    }

    draw(context, drawHitBox) {
        if ( this.isVisible() ) { this.sprites[this.facing].draw(context, drawHitBox); }
    }

    getHitBox() {
        return this.sprites[this.facing].getHitBox();
    }

    getActiveSprite() {
        return this.sprites[this.facing];
    }

}