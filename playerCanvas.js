import { potionColorText, potionEffectText } from "./potion.js";
import { skeletonIdle } from "./sprite_classes/knownSprites.js";
import { overlayText } from "./text.js";
import { Point } from "./utilities.js";

class statLabelText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Arial', 16, location, 'right','rgba(192,192,192,1)', 'rgba(255,255,255,0)', 0, 0, 0)
    }
}

class potionLabelText extends overlayText {
    constructor(displayText, location) {
        super(displayText, 'Arial', 16, location, 'left','rgba(192,192,192,1)', 'rgba(255,255,255,0)', 0, 0, 0)
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
    constructor(player, canvasID, potionDictionary) {
        this.potionDictionary = potionDictionary;
        this.potionDesciprions = [];
        for (let i = 0; i<this.potionDictionary.potions.length; i++) {
            this.potionDictionary.potions[i].changeLocation(16, 100+i*32);
            this.potionDesciprions.push(new potionLabelText("UNKOWN", new Point(30, 110+i*32)) );
        }
        this.canvas = document.getElementById(canvasID);
        this.canvas.width = 250;
        this.canvas.height = 250;
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

    countPotions(color) {
        let count = 0;
        return count;
    }
    
    update(deltaTime) {
        this.playerImage.update(deltaTime);
        this.hpText.setColor(this.player.hitPoints);
        this.potionDictionary.potions.forEach((potion, index) => {
            let color = potionColorText[potion.color];
            let effect = "Unkown"
            if (potion.identified) {effect = potionEffectText[potion.effect];}
            let qty = 0;
            this.player.items.forEach((item) => {
                if (item.color == potion.color) {qty++;}
            })
            this.potionDesciprions[index].text = qty + " " + color + " " + effect
        })
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.playerImage.draw(this.ctx);
        this.statLabels.forEach((stat) => { stat.draw(this.ctx); })
        // Draw Potion List with Descriptions
        this.potionDictionary.potions.forEach((potion) => { potion.draw(this.ctx); })
        this.potionDesciprions.forEach((description) => {description.draw(this.ctx); })
        this.hpText.draw(this.ctx);
    }
}