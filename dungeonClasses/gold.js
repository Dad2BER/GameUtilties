import { Sprite } from "../sprite_classes/sprite.js";
import { RandomNumber } from "../utilities.js";

export class Gold extends Sprite {
    constructor(x,y, Quantity) {
        super('gold_piles', x, y, 32, 32, 0, Quantity+1, 0);
        this.Quantity = Quantity;
        console.log("Gold Added: " + this.Quantity);
    }
}