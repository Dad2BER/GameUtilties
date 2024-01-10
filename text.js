import { Point } from "./utilities.js";

export const FontColors = {redTrue: 'rgba(255, 0, 0, 1)', redDark: 'rgba(255, 64, 64, 1)', 
                           yellowTrue: 'rgba(255, 255, 0, 1)', yellowAmber: 'rgba(255, 191, 0, 1)',
                           greenTrue: 'rgba(0, 255, 0, 1)', greenDark: 'rgba(0, 128, 0, 1)',
                           black: 'rgba(0, 0, 0, 1)'                  
                        }

export class overlayText {
    constructor(displayText, fontFamily, fontSize, location, alignement, fontColor, shadowColor, vx, vy, fadeSpeed) {
        this.text = displayText;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.location = location;
        this.fontColor = fontColor;
        this.shadowColor = shadowColor;
        this.alignement = alignement;
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
        this.fontColor = newRGBA;
        this.location.x += this.vx*deltaTime;
        this.location.y += this.vy*deltaTime;
        if (tmpValue <= 0) {this.markedForDeletion = true;}
    }

    draw(context) {
        context.save();
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = this.shadowColor;
        context.shadowBlur = 0;
        context.font = "bold " + this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = this.alignement ;
        context.fillStyle = this.fontColor;
        context.fillText(this.text, this.location.x, this.location.y);
        context.restore();
    }
}

export class statusText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Helvetica', 15, location, 'center','rgba(255,0,0,1)', 'rgba(255,128,129,1)', 0, 0, 5)
    }
}

export class monsterDamageText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Helvetica', 15, 
              new Point(location.x + Math.floor(Math.random() * 10) - 5, location.y + Math.floor(Math.random()*10)-5), 
              'center','rgba(255,0,0,1)', 'rgba(255,128,129,1)', Math.floor(Math.random()*50) - 25, -50, 5);
    }
}

export class playerDamageText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Helvetica', 15, 
              new Point(location.x + Math.floor(Math.random() * 10) - 5, location.y + Math.floor(Math.random()*10)-5), 
              'center','rgba(255,255,0,1)', 'rgba(128,128,129,1)', Math.floor(Math.random()*50) - 25, -50, 5);
    }
}

export class youDiedText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Helvetica', 120, location, 'center', FontColors.redTrue, FontColors.black, 0, 0, 0);
    }
}


