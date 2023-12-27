import { HitBox, Point } from "../utilities.js";

export class Sprite {
    
    constructor(spriteSheetImageID, x, y, spriteWidth, spriteHeight, numberFrames, frameX, frameY) {
        this.image = document.getElementById(spriteSheetImageID); //Image sheet to be used for this sprite
        this.frameX = frameX; //Which X frame are we currently on
        this.frameY = frameY;
        this.maxFrames = numberFrames-1;
        this.width = spriteWidth; //Width of one sprite frame
        this.height = spriteHeight; //Height of one sprite frame
        //NOTE:  Very Important, we are going to standardize on x,y being the center of the sprite so when we draw we will adjust for width and height
        this.x = x; //X Location of sprite in the world
        this.y = y; //Y Location of sprite in the world
        this.drawX = this.x - this.width/2;
        this.drawY = this.y - this.height/2;
        this.solid = true;
    }

    move(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
        this.drawX = this.x - this.width/2;
        this.drawY = this.y - this.height/2;
    }
    //Move the sprite to a new world location
    changeLocation(newX, newY) {
        this.x = newX;
        this.y = newY;
        this.drawX = this.x - this.width/2;
        this.drawY = this.y - this.height/2;
    }

    getLocation() { return new Point(this.x, this.y); }

    update(deltaTime) {
    }

    draw(context, drawHitBox) {
        if (drawHitBox === true) {
            context.strokeRect(this.drawX, this.drawY, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
                          this.drawX, this.drawY, this.width, this.height);
    }

    getHitBox() {
        return new HitBox(this.drawX, this.drawY, this.width, this.height);
    }
}

export class RandomeSpirte extends Sprite {
    constructor(spriteSheetImageID, x, y, spriteWidth, spriteHeight, numberFrames) {
        super(spriteSheetImageID, x, y, spriteWidth, spriteHeight, numberFrames, Math.floor(Math.random() * numberFrames),0)
    }
}

export class AnimatedSprite extends Sprite {
    constructor(spriteSheetImageID, x, y, spriteWidth, spriteHeight, numberFrames, fps, loop) {
        super(spriteSheetImageID, x, y, spriteWidth, spriteHeight, numberFrames, 0, 0);
        this.fps = fps; //How many frames per second should display (how fast is the animation)
        this.frameInterval = 1000/this.fps; //Based on the fps, we can determin how much time to leave between frames
        this.frameTimer = 0; //Need to keep track of how long we have been on this frame
        
        this.loop = loop;
        this.animationFinished = false;
        this.endAnimationDelay = 1000;
    }

    restartArnimation() {
        this.frameX = 0;
        this.animationFinished = false;
    }

    update(deltaTime) {
        super.update(deltaTime);
        //Sprite Animation
        if (this.animationFinished) {
            this.endAnimationDelay -= deltaTime;
        }
        else if (this.frameTimer > this.frameInterval) { //If we have spent enough time on this frame, move to the next
            this.frameTimer = 0;
            if (this.frameX < this.maxFrames) { 
                this.frameX++;
            }
            else if (this.loop) {
                this.restartArnimation();
            }
            else {
                this.animationFinished = true;
            }
        } else {
            this.frameTimer += deltaTime;
        }
    }



}

