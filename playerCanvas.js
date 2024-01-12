import { potionColorText, potionEffectText } from "./dungeonClasses/potion.js";
import { scrollColorText, scrollEffectText } from "./dungeonClasses/scroll.js";
import { skeletonIdle } from "./sprite_classes/knownSprites.js";
import { overlayText, FontColors } from "./text.js";
import { Point } from "./dungeonClasses/utilities.js";

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

class rygText extends overlayText {
    constructor(locaton, redThreshold, yellowThreshold) {
        super("", 'Arial', 12, locaton, 'left', FontColors.redTrue, FontColors.redDark, 0, 0, 0);
        this.redThreshold = redThreshold;
        this.yellowThreshold = yellowThreshold;
    }

    setColor(value) {
        this.text = value; 
        if (value < this.redThreshold) {
            this.fontColor = FontColors.redTrue;
            this.shadowColor = FontColors.redDark;
        }
        else if (value < this.yellowThreshold) {
            this.fontColor = FontColors.yellowTrue;
            this.shadowColor = FontColors.yellowAmber;
        }
        else {
            this.fontColor = FontColors.greenTrue;
            this.shadowColor = FontColors.greenDark;
        }
    }

}

export class PlayerCanvas {
    constructor(player, canvasID, potionDictionary, scrollDictionary) {
        this.potionDictionary = potionDictionary;
        this.potionDesciprions = [];
        for (let i = 0; i<this.potionDictionary.potions.length; i++) {
            this.potionDictionary.potions[i].show();
            this.potionDictionary.potions[i].setLocation(16, 100+i*32);
            this.potionDesciprions.push(new potionLabelText("POTION", new Point(30, 110+i*32)) );
        }
        this.scrollDictionary = scrollDictionary;
        this.scrollDesciprions = [];
        for (let i = 0; i<this.scrollDictionary.scrolls.length; i++) {
            this.scrollDictionary.scrolls[i].show();
            this.scrollDictionary.scrolls[i].setLocation(155, 100+i*32);
            this.scrollDesciprions.push(new potionLabelText("SCROLL", new Point(165, 110+i*32)) );
        }


        this.canvas = document.getElementById(canvasID);
        this.canvas.width = 250;
        this.canvas.height = 250;
        this.ctx = this.canvas.getContext('2d');
        this.player = player;
        this.playerImage = new skeletonIdle(30, 30);
        this.playerImage.show();
        this.statLabels = [];
        this.statLabels.push(new statLabelText("H.P.:", new Point(120, 20)) );
        this.statLabels.push(new statLabelText("Damage:", new Point(120, 37)) );
        this.statLabels.push(new statLabelText("Defence:", new Point(120, 54)) );
        this.statLabels.push(new statLabelText("Gold:", new Point(120, 71)) );
        this.hpText = new rygText(new Point(125, 18), 5, 10);  
        this.hpText.setColor(this.player.hitPoints);
        this.damageText = new rygText(new Point(125, 35), 0, 0);
        this.damageText.setColor(this.player.damageModifier);
        this.defenceText = new rygText(new Point(125, 52), 0, 0);
        this.defenceText.setColor(this.player.defenceModifier);
        this.goldText = new overlayText(this.player.gold, 
                                           'Arial', 12, new Point(125,69), 'left', FontColors.yellowAmber, FontColors.yellowTrue, 0, 0, 0);
    
        this.potionIndex = 0;
        this.scrollIndex = 0;
        this.readyForInput = true; //This allows us to only trigger on the key down, once
    }

    handleInput(input) {
        if (this.readyForInput) {
            if ( input.includes('p') ) {
                this.potionIndex += 1;
                if (this.potionIndex >= this.potionDictionary.potions.length) { this.potionIndex = 0;}
            }
            if (input.includes('s') ) {
                this.scrollIndex += 1;
                if (this.scrollIndex >= this.scrollDictionary.scrolls.length) { this.scrollIndex = 0;}
            }
        }
        this.readyForInput = input.includes('p')==false && input.includes('s')==false;
    }

    quaffPotion() {
        let dictionaryPotion = this.potionDictionary.potions[this.potionIndex]; 
        let effect = null;
        if (this.playerItemCount("potions", dictionaryPotion.color) > 0) {
            effect = this.potionDictionary.getEffect(dictionaryPotion.color);
            dictionaryPotion.identified = true;
            this.removePlayerItem("potions", dictionaryPotion.color);
        }
        return effect;
    }

    readScroll() {
        let dictionaryScroll = this.scrollDictionary.scrolls[this.scrollIndex]; 
        let effect = null;
        if (this.playerItemCount("scrolls", dictionaryScroll.color) > 0) {
            effect = this.scrollDictionary.getEffect(dictionaryScroll.color);
            dictionaryScroll.identified = true;
            this.removePlayerItem("scrolls", dictionaryScroll.color);
        }
        return effect;
    }

    identifyItem() {
        let rVal = null;
        this.potionDictionary.potions.forEach((potion) => {
            if (potion.identified == false && rVal == null) {
                potion.identified = true;
                rVal = potion;
            }
        })
        this.scrollDictionary.scrolls.forEach((scroll) => {
            if (scroll.identified == false && rVal == null) {
                scroll.identified = true;
                rVal = potion;
            }
        })
        return rVal;
    }

    removePlayerItem(type, color) {
        let index = -1;
        this.player.items.forEach((item, i) => {
            if (item.spriteType == type && item.color == color) {index = i;}
        })
        if (index >= 0) {
            this.player.items.splice(index, 1);
        }
    }
    
    playerItemCount(type, color) {
        let qty = 0;
        this.player.items.forEach((item) => {
            if (item.spriteType == type && item.color == color) {qty++;}
        })
        return qty;
    }

    update(deltaTime) {
        this.playerImage.update(deltaTime);
        this.hpText.setColor(this.player.hitPoints);
        this.hpText.text =  this.player.hitPoints + " / " + this.player.maxHitPoints
        // Potions
        this.potionDictionary.potions.forEach((potion, index) => {
            let effect = "Unkown"
            if (potion.identified) {effect = potionEffectText[potion.effect];}
            let qty = this.playerItemCount("potions", potion.color);
            this.potionDesciprions[index].text = qty + " " + effect
        })
        // Scrolls
        this.scrollDictionary.scrolls.forEach((scroll, index) => {
            let effect = "Unkown"
            if (scroll.identified) {effect = scrollEffectText[scroll.effect];}
            let qty = this.playerItemCount("scrolls", scroll.color);
            this.scrollDesciprions[index].text = qty + " " + effect
        })
        // Damage Modifier
        this.damageText.setColor(this.player.damageModifier);
        if (this.player.damageModifier > 0) { 
            this.damageText.text = this.player.minDamage + " to " + this.player.maxDamage + " +" + this.player.damageModifier; 
        }
        else if (this.player.damageModifier < 0) {
            this.damageText.text = this.player.minDamage + " to " + this.player.maxDamage + " " + this.player.damageModifier; 
        }
        else {
            this.damageText.text = this.player.minDamage + " to " + this.player.maxDamage
        }
        // Defence Modifier
        this.defenceText.setColor(this.player.defenceModifier);
        if (this.player.defenceModifier > 0) { 
            this.defenceText.text = "+" + this.player.defenceModifier; 
        }
        else {
            this.defenceText.text = this.player.defenceModifier; 
        }
        // Gold
        this.goldText.text = this.player.gold;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'rgba(0,0,0,1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.playerImage.draw(this.ctx);
        this.statLabels.forEach((stat) => { stat.draw(this.ctx); })
        // Draw Potion List with Descriptions
        this.potionDictionary.potions.forEach((potion, index) => { 
            if (index == this.potionIndex) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "white";
                this.ctx.rect(4, 84+32*index, 106, 30);
                this.ctx.stroke();
            }
            potion.draw(this.ctx); 
        })
        this.potionDesciprions.forEach((description) => {description.draw(this.ctx); })
        // Draw Scroll List with Descriptions
        this.scrollDictionary.scrolls.forEach((scroll, index) => { 
            if (index == this.scrollIndex) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "white";
                this.ctx.rect(139, 84+32*index, 106, 30);
                this.ctx.stroke();
            }    
            scroll.draw(this.ctx); 
        })
        this.scrollDesciprions.forEach((description) => {description.draw(this.ctx); })
        this.hpText.draw(this.ctx);
        this.damageText.draw(this.ctx);
        this.defenceText.draw(this.ctx);
        this.goldText.draw(this.ctx);
        this.playerImage.draw(this.ctx, false);
    }
}