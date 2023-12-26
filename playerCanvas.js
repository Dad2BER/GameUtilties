import { skeletonIdle } from "./sprite_classes/knownSprites.js";
import { overlayText } from "./text.js";
import { Point } from "./utilities.js";

class statLabelText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Arial', 16, location, 'right','rgba(192,192,192,1)', 'rgba(255,255,255,0)', 0, 0, 0)
    }
}

const redTrue = 'rgba(255, 0, 0, 1)';
const redDark = 'rgba(255, 64, 64, 1)';
const yellowTrue = 'rgba(255, 255, 0, 1)';
const yellowAmber = 'rgba(255, 191, 0, 1)';
const greenTrue = 'rgba(0, 255, 0, 1)';
const greenDark = 'rgba(0, 128, 0, 1)';
class rygText extends overlayText {
    constructor(locaton, redThreshold, yellowThreshold) {
        super("", 'Arial', 16, locaton, 'left', redTrue, redDark, 0, 0, 0);
        this.redThreshold = redThreshold;
        this.yellowThreshold = yellowThreshold;
    }

    setColor(value) {
        this.text = value; 
        if (value < this.redThreshold) {
            this.fontColor = redTrue;
            this.shadowColor = redDark;
        }
        else if (value < this.yellowThreshold) {
            this.fontColor = yellowTrue;
            this.shadowColor = yellowAmber;
        }
        else {
            this.fontColor = greenTrue;
            this.shadowColor = greenDark;
        }
    }

}

export class PlayerCanvas {
    constructor(player, canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.canvas.width = 200;
        this.canvas.height = 200;
        this.ctx = this.canvas.getContext('2d');
        this.player = player;
        this.playerImage = new skeletonIdle(30, 30);
        this.statLabels = [];
        this.statLabels.push(new statLabelText("H.P.: ", new Point(120, 20)) );
        this.statLabels.push(new statLabelText("Wepeon: ", new Point(120, 40)) );
        this.statLabels.push(new statLabelText("Status: ", new Point(120, 60)) );
        this.hpText = new rygText(new Point(125, 20), 5, 10);
        this.hpText.setColor(this.player.hitPoints);
    }
    
    update(deltaTime) {
        this.playerImage.update(deltaTime);
        this.hpText.setColor(this.player.hitPoints);
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.playerImage.draw(this.ctx);
        this.statLabels.forEach((stat) => { stat.draw(this.ctx); })
        this.hpText.draw(this.ctx);
    }
}