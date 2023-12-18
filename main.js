import { MyGame } from "./myGame.js";

window.addEventListener('load', function(){

    //Need to initialize a new Game Ojbect
    const game = new MyGame('canvas1',32*25, 32*15);

    //The main.js will need to start the animaiton loop and then continue to update the game on every cycle
    //The game will return false when it is ready to be finished (probably because the game is over)
    function animate(timeStamp) {
        //Game Update will return true if it wants us to continue the animaiton loop
        if(game.update(timeStamp)) {requestAnimationFrame(animate);}
    }
    animate(0);
})
