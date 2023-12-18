export const direction = {LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3};

export class DirectionSprite {
    constructor(leftSprite, rightSprite, upSprite, downSprite, facing) {
        this.sprites = [leftSprite, rightSprite, upSprite, downSprite];
        this.facing = facing;
        this.x = this.sprites[this.facing].x;
        this.y = this.sprites[this.facing].y;
    }

    setLocation(x,y) {
        this.x = x;
        this.y = y;
        this.sprites.forEach(sprite => {
            sprite.changeLocation(x, y);
        });
    }

    setDirection(newDirection) {
        this.facing = newDirection;
        this.sprites[this.facing].restartArnimation();
    }

    update(deltaTime) {
        this.sprites[this.facing].update(deltaTime);
    }

    draw(context, drawHitBox) {
        this.sprites[this.facing].draw(context, drawHitBox);
    }

    getHitBox() {
        return this.sprites[this.facing].getHitBox();
    }

}