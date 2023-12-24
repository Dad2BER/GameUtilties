export class overlayText {
    constructor(displayText, fontFamily, fontSize, location, fontColor, shadowColor, vx, vy, fadeSpeed) {
        this.text = displayText;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.location = location;
        this.fontColor = fontColor;
        this.shadowColor = shadowColor;
        this.vx = vx/1000.0;       //Convert speeds to pixels per second 
        this.vy = vy/1000.0;
        this.fadeSpeed = fadeSpeed/1000.0; //Convert to percent per second
        this.markedForDeletion = false;
        this.alpha = 1;
    }

    update(deltaTime) {
        this.alpha -= this.fadeSpeed;
        let lastComma = this.fontColor.lastIndexOf(',');
        let tmpValue = Math.floor(this.alpha*100)/100;
        let newRGBA = this.fontColor.substr(0, lastComma+1) + " " + tmpValue + ") "
        this.text = newRGBA;
        this.fontColor = newRGBA;
        if (tmpValue <= 0) {this.markedForDeletion = true;}
    }

    draw(context) {
        context.save();
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = this.shadowColor;
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.fontColor;
        context.fillText(this.text, this.location.x, this.location.y);
        context.restore();
    }
}

export class statusText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Helvetica', 15, location, 'rgba(255,0,0,1)', 'rgba(255,128,129,1)', 0, 0, 1)
    }
}