import { MovingSprite } from "./sprite_classes/movingSprite.js";
import { Sprite } from "./sprite_classes/sprite.js";
import { RandomNumber, direction, sidedDice } from "./utilities.js";

export const monsterType = {RAT: 'rats', TROLL: 'trolls',GIANT: 'giants', ORC: 'orcs', DRAGON: 'dragons'};
export const ratSubtype = {BROWN: 0, GREEN: 1, GREY: 2, ORANGE: 3, RED: 4};
export const trollSubtype = {NORMAL: 0, DEEP: 1, BERSERKER: 2, MAGE: 3, SHAMAN: 4, IRON: 5, MOON: 6, ROCK: 7}
const diceBag = new RandomNumber();

class Monster extends MovingSprite{
    constructor(x,y,type,subtype, speed, hitPoints, meleDamage, rangeDamage) {
        super(new Sprite(type,x,y,32,32,0,subtype,0), new Sprite(type,x,y,32,32,0,subtype,0), 
              new Sprite(type,x,y,32,32,0,subtype,0), new Sprite(type,x,y,32,32,0,subtype,0), 
              direction.LEFT,speed);
        this.wander = false;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        super.update(deltaTime);
//        console.log("DeltaTime: " + X: " + this.x + " Y: " + this.y + " vx: " + this.vx + " vy: " + this.vy);
        if (this.wander){

        }
    }

    setRandomDirection() {
        this.wander = true;
        let randomDirection = diceBag.d4() -1;
        console.log(randomDirection)
        this.setDirection(diceBag.d4() - 1); //Directions are 0 based and d4 is 1 to 4
    }

}    

const monsterSpeed = {RAT: 15, TROLL: 10, GIANT: 10, ORC: 12, DRAGON: 17};
export class rat extends Monster{ constructor(x,y,subtype) { super(x,y,
                 monsterType.RAT,subtype, monsterSpeed.RAT, 
                 diceBag.roll(1, sidedDice.d4), diceBag.roll(1, sidedDice.d4), 0); }}
export class troll extends Monster{ constructor(x,y,subtype) { super(x,y,
                 monsterType.TROLL, subtype, monsterSpeed.TROLL,
                 diceBag.roll(1, sidedDice.d6), diceBag.roll(1, sidedDice.d8), 0); }}
export class giant extends Monster{ constructor(x,y,subtype) { super(x,y,
                 monsterType.GIANT, subtype, monsterSpeed.GIANT,
                 diceBag.roll(2, sidedDice.d8), diceBag.roll(1, sidedDice.d8), 0); }}
export class orc extends Monster{ constructor(x,y,subtype) { super(x,y,
                 monsterType.ORC, subtype, monsterSpeed.ORC,
                 diceBag.roll(2, sidedDice.d6), diceBag.roll(1, sidedDice.d6), 0); }}
export class dragon extends Monster{ constructor(x,y,subtype) { super(x,y,
                monsterType.DRAGON, subtype, monsterSpeed.DRAGON,
                diceBag.roll(3, sidedDice.d10), diceBag.roll(1, sidedDice.d10), diceBag.roll(2,sidedDice.d4)); }}

