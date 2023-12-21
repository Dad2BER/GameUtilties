/* Normall this may all go inside the main.js file, but I want to keep main.js as clean as possible to show the minimum a main.js needs to contain */
import { Game } from "./game.js";
import { Player } from "./myPlayer.js";
import { TileMap } from "./tileMap.js";
import { Point, direction } from "./utilities.js";

export class MyGame extends Game {
    constructor(canvasID, width, height) {
        super(canvasID, width, height);
        this.map = new TileMap(Math.floor(width/32), Math.floor(height/32));
        let firstRoom = this.map.rooms[0];
        this.player = new Player(firstRoom.x + Math.floor(firstRoom.width/2),
                                      firstRoom.y+Math.floor(firstRoom.height/2));
    }

    update(timeStamp) {
        let deltaTime = super.update(timeStamp);
        this.player.handleInput(this.InputHandler.keys)
        this.player.update(deltaTime);
        let playerHitBox = this.player.getHitBox();
        let mapTiles = this.map.mapTiles(playerHitBox);
        let adjust = new Point(0,0);
        let adjustPlayer = false;
        mapTiles.forEach((tile)=> { 
            if(tile.solid) { adjustPlayer = true;} 
        })
        if (adjustPlayer) {
            this.player.undoMove();
            let left=mapTiles[0].x;
            let right = mapTiles[0].x;
            let top = mapTiles[0].y;
            let bottom = mapTiles[0].y;
            mapTiles.forEach((tile)=> {
                if (tile.x < left) left = tile.x;
                if (tile.x > right) right = tile.x;
                if (tile.y < top) top = tile.y;
                if (tile.y > bottom) bottom = tile.y;
            }) 
            mapTiles.forEach((tile)=> {
                let tBox = tile.getHitBox();
                switch(this.player.getDirection()) {
                    case direction.LEFT:
                        if (tile.x == left && !tile.solid) adjust.y = tBox.y - playerHitBox.y;
                        break;
                    case direction.RIGHT:
                        if (tile.x == right && !tile.solid) adjust.y = tBox.y - playerHitBox.y;
                        break;
                    case direction.UP:
                        if (tile.y == top && !tile.solid) adjust.x = tBox.x - playerHitBox.x;
                        break;
                    case direction.DOWN:
                        if (tile.y == bottom && !tile.solid) adjust.x = tBox.x - playerHitBox.x;
                        break;
                    }
                }
            ) 
            if (adjust.x != 0 || adjust.y != 0) { //Only adjust if we can, and if it is a small adjustment
                if (Math.abs(adjust.x)<8 && Math.abs(adjust.y)<8) this.player.adjustLocation(adjust.x, adjust.y);
            }            
        }
        this.draw(this.ctx);
        return true;
    }
    
    draw(context){
        super.draw(context);
        this.map.draw(context);
        this.player.draw(context);
    }
}
