import { Sprite } from "../sprite_classes/sprite.js";
import { RandomNumber } from "./utilities.js";
export const potionColor = {BLACK: 0, BRILIANT_BLUE: 1, BROWN: 2, CYAN: 3, EMERALD: 4, MAGENTA: 5, 
                            ORANGE: 6, PINK: 7, RUBY: 8, SILVER: 9, SKY_BLUE: 10, YELLOW: 11, WHITE: 12 };
export const potionColorText = ["Black", "Briliant Blue", "Brown", "CYAN", "EMERALD", "MAGENTA", 
                                "ORANGE", "PINK", "RUBY", "SILVER", "Sky Blue", "Yellow", "White"];
export const potionEffect = {RANDOM: 0, HEAL: 1, STRENGTH: 2, DEXTARITY: 3, POISON: 4};
export const potionEffectText = ["Random", "Heal", "Strength", "Dextarty", "Poison"];

export class Potion extends Sprite {
    constructor(x,y, color, effect) {
        super('potions', x, y, 32, 32, color, 0);
        let diceBag = new RandomNumber();
        this.identified = false;
        this.color = color;
        this.effect = effect;
    }
}

export class PotionDictionary {
    constructor() {
        this.potions = [];
        this.diceBag = new RandomNumber();
        for(let i=0; i<potionEffectText.length; i++) {
            let color = this.diceBag.intBetween(0, potionColorText.length-1); 
            while (this.getEffect(color) != -1) { color = this.diceBag.intBetween(0, potionColorText.length-1); }
            let effect = this.diceBag.intBetween(0, potionEffectText.length-1);
            while (this.getColor(effect) != -1) { effect = this.diceBag.intBetween(0, potionEffectText.length-1); }
            this.potions.push(new Potion(0, 0, color, effect));
        }
    }

    getEffect(color) {
        let RVal = -1;
        this.potions.forEach((potion) => { 
            if (potion.color == color) { return RVal = potion.effect; }
        })
        return RVal;
    }

    getColor(effect) {
        let RVal = -1;
        this.potions.forEach((potion) => {
            if (potion.effect == effect) { RVal = potion.color; }
        })
        return RVal;
    }

    getRandom() {
        let randomPotion = this.potions[this.diceBag.intBetween(0, this.potions.length -1)];  
        return new Potion(0, 0, randomPotion.color, randomPotion.effect); 
    }

}