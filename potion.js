import { Sprite } from "./sprite_classes/sprite.js"
import { RandomNumber } from "./utilities.js";
export const potionColor = {UNKNOWN: -1, BLACK: 0, BRILIANT_BLUE: 1, BROWN: 2, CYAN: 3, EMERALD: 4, MAGENTA: 5, 
                            ORANGE: 6, PINK: 7, RUBY: 8, SILVER: 9, SKY_BLUE: 10, YELLOW: 11, WHITE: 12 }
export const potionEffect = {UNKNOWN: -1, RANDOM: 0, HEAL: 1, STRENGTH: 2, DEXTARITY: 3}

export class Potion extends Sprite {
    constructor(x,y, color, effect) {
        super('potions', x, y, 32, 32, 0, color, 0);
        let diceBag = new RandomNumber();
        this.identified = false;
        this.color = color;
        this.effect = effect;
        if (effect == potionEffect.RANDOM) { this.effect = diceBag.d4(); }
    }
}

export class PotionDictionary {
    constructor() {
        this.potions = [];
        let diceBag = new RandomNumber();
        for(let i=1; i<=3; i++) { //For every potion effect, find a random unused color to assign it to
            //NOTE:  If the number of effects starts getting close to the number of colors thers are more efficient ways to implement this
            let color = diceBag.intBetween(0, 12); 
            while (this.getEffect(color) != potionEffect.UNKNOWN) { color = diceBag.intBetween(0, 12); }
            this.potions.push(new Potion(0, 0, color, i));
        }
    }

    getEffect(color) {
        this.potions.forEach((potion) => { 
            if (potion.color == color) { return potion.effect; }
        })
        return potionEffect.UNKNOWN;
    }

    getColor(effect) {
        this.potions.forEach((potion) => {
            if (potion.effect == effect) { return potion.color; }
        })
        return potionColor.UNKNOWN;
    }

}