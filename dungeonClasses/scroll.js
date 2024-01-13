import { Sprite } from "../sprite_classes/sprite.js";
import { RandomNumber } from "./utilities.js";
export const scrollColor = {UNKNOWN: -1, BLUE: 0, BROWN: 1, CYAN: 2, GREEN: 3, GRAY: 4, PURPLE: 5, RED: 6, YELLOW: 7 };
export const scrollColorText = ["Blue", "Brown", "CYAN", "Green", "Gray", "Purple", "Red", "Yellow"];
export const scrollEffect = {RANDOM: 0, IDENTIFY: 1, FIREBALL: 2, MAP: 3, CURSE: 4};
export const scrollEffectText = ["Random", "Identify", "Fireball", "Map", "Curse"];

export class Scroll extends Sprite {
    constructor(x,y, color, effect) {
        super('scrolls', x, y, 32, 32, color, 0);
        let diceBag = new RandomNumber();
        this.identified = false;
        this.color = color;
        this.effect = effect;
        if (effect == scrollEffect.RANDOM) { this.effect = diceBag.intBetween(1,scrollEffectText.length); }
    }
}

export class ScrollDictionary {
    constructor() {
        this.scrolls = [];
        this.diceBag = new RandomNumber();
        for(let i=0; i<scrollEffectText.length; i++) {
            let color = this.diceBag.intBetween(0, 7); 
            while (this.getEffect(color) != -1) { color = this.diceBag.intBetween(0, 7); }
            let effect = this.diceBag.intBetween(0, scrollEffectText.length-1);
            while (this.getColor(effect) != -1) { effect = this.diceBag.intBetween(0, scrollEffectText.length-1); }
            this.scrolls.push(new Scroll(0, 0, color, effect));
        }
    }

    getEffect(color) {
        let RVal = -1;
        this.scrolls.forEach((scroll) => { 
            if (scroll.color == color) { RVal = scroll.effect; }
        })
        return RVal;
    }

    getColor(effect) {
        let RVal = scrollColor.UNKNOWN;
        this.scrolls.forEach((scroll) => {
            if (scroll.effect == effect) { RVal = scroll.color; }
        })
        return RVal;
    }

    getRandom() { 
        let randomScroll = this.scrolls[this.diceBag.intBetween(0, this.scrolls.length -1)]; 
        return new Scroll(0, 0, randomScroll.color, randomScroll.effect); 
    }

}