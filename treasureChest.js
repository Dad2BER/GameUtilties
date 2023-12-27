import {chest} from "./sprite_classes/knownSprites.js"

export class TreasureChest extends chest {
    constructor(x,y) {
        super(x,y);
        this.isOpen = false;
        this.itemList = [];
    }

    close() { this.frameX = 0; this.isOpen = false;}
    open() { this.frameX = 1; this.isOpen = true;}
}