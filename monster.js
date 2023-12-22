import { Sprite } from "./sprite_classes/sprite.js";

export const monsterType = {RAT: 'rats', TROLL: 'trolls',GIANT: 'giants', ORC: 'orcs', DRAGON: 'dragons'};
export const ratSubtype = {BROWN: 0, GREEN: 1, GREY: 2, ORANGE: 3, RED: 4};
export const trollSubtype = {NORMAL: 0, DEEP: 1, BERSERKER: 2, MAGE: 3, SHAMAN: 4, IRON: 5, MOON: 6, ROCK: 7}

class Monster extends Sprite{
    constructor(x,y,type,subtype) {
        super(type,x,y,32,32,0,subtype,0);
    }
}    

export class rat extends Monster{ constructor(x,y,subtype) { super(x,y,monsterType.RAT,subtype); }}
export class troll extends Monster{ constructor(x,y,subtype) { super(x,y,monsterType.TROLL, subtype); }}
export class giant extends Monster{ constructor(x,y,subtype) { super(x,y,monsterType.GIANT, subtype); }}
export class orc extends Monster{ constructor(x,y,subtype) { super(x,y,monsterType.ORC, subtype); }}
export class dragon extends Monster{ constructor(x,y,subtype) { super(x,y,monsterType.DRAGON, subtype); }}

