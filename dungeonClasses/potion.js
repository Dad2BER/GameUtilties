import { Sprite } from "../sprite_classes/sprite.js";
import { RandomNumber } from "../utilities.js";
export const potionColor = {UNKNOWN: -1, BLACK: 0, BRILIANT_BLUE: 1, BROWN: 2, CYAN: 3, EMERALD: 4, MAGENTA: 5, 
                            ORANGE: 6, PINK: 7, RUBY: 8, SILVER: 9, SKY_BLUE: 10, YELLOW: 11, WHITE: 12 };
export const potionColorText = ["Black", "Briliant Blue", "Brown", "CYAN", "EMERALD", "MAGENTA", 
                                "ORANGE", "PINK", "RUBY", "SILVER", "Sky Blue", "Yellow", "White"];
export const potionEffect = {RANDOM: 0, HEAL: 1, STRENGTH: 2, DEXTARITY: 3, POISON: 4};
export const potionEffectText = ["Random", "Heal", "Strength", "Dextarty", "Poison"];
const NumberEffects = 4;

export class Potion extends Sprite {
    constructor(x,y, color, effect) {
        super('potions', x, y, 32, 32, color, 0);
        let diceBag = new RandomNumber();
        this.identified = false;
        this.color = color;
        this.effect = effect;
        if (effect == potionEffect.RANDOM) { this.effect = diceBag.intBetween(1,NumberEffects); }
    }
}

export class PotionDictionary {
    constructor() {
        this.potions = [];
        this.diceBag = new RandomNumber();
        for(let i=1; i<=NumberEffects; i++) { //For every potion effect, find a random unused color to assign it to
            //NOTE:  If the number of effects starts getting close to the number of colors thers are more efficient ways to implement this
            let color = this.diceBag.intBetween(0, 12); 
            while (this.getEffect(color) != -1) { color = this.diceBag.intBetween(0, 12); }
            this.potions.push(new Potion(0, 0, color, i));
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
        let RVal = potionColor.UNKNOWN;
        this.potions.forEach((potion) => {
            if (potion.effect == effect) { RVal = potion.color; }
        })
        return RVal;
    }

    getRandom() { return this.potions[this.diceBag.intBetween(0, this.potions.length -1)]; }

}