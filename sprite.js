export class Sprite {
    
    constructor(spriteSheetImageID, x, y, spriteWidth, spriteHeight, numberFrames, fps) {
        this.image = document.getElementById(spriteSheetImageID); //Image sheet to be used for this sprite
        this.maxFrames = numberFrames-1;
        this.width = spriteWidth; //Width of one sprite frame
        this.height = spriteHeight; //Height of one sprite frame
        //NOTE:  Very Important, we are going to standardize on x,y being the center of the sprite so when we draw we will adjust for width and height
        this.x = x; //X Location of sprite in the world
        this.y = y; //Y Location of sprite in the world
        this.drawX = this.x - this.width/2;
        this.drawY = this.y - this.height/2;

        this.frameX = 0; //Which X frame are we currently on
        this.fps = fps; //How many frames per second should display (how fast is the animation)
        this.frameInterval = 1000/this.fps; //Based on the fps, we can determin how much time to leave between frames
        this.frameTimer = 0; //Need to keep track of how long we have been on this frame

        this.flipHorizontal = false;
        console.log(this);
    }

    //Move the sprite to a new world location
    changeLocation(newX, newY) {
        this.x = newX;
        this.y = newY;
        this.drawX = this.x - this.width/2;
        this.drawY = this.y - this.height/2;
    }

    update(deltaTime) {
        //Sprite Animation
        if (this.frameTimer > this.frameInterval) { //If we have spent enough time on this frame, move to the next
            this.frameTimer = 0;
            if (this.frameX < this.maxFrames) { this.frameX++;}
            else {this.frameX = 0;}
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context, drawHitBox) {
        if (drawHitBox === true) {
            context.strokeRect(this.drawX, this.drawY, this.width, this.height);
        }
        if (this.flipHorizontal) {
            context.translate(this.drawX + this.width, this.drawY);
            context.scale(-1,1);
        }
        else {
            context.translate(this.drawX, this.drawY);//Multiply widht times 1.5 because we are offsetting the X by half the width of the image
        }
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, 0, 0, this.width, this.height);
        context.setTransform(1,0,0,1,0,0);
    }

}