import { MyGame } from "./myGame.js";

window.addEventListener('load', function(){
    //Need to initialize a new Game Ojbect
    console.log("addEventListener");
    const game = new MyGame('canvas1',800, 500);

    //The main.js will need to start the animaiton loop and then continue to update the game on every cycle
    function animate(timeStamp) {
        //Game Update will return true if it wants us to continue the animaiton loop
        if (game.update(timeStamp)) { requestAnimationFrame(animate); }
    }
    animate(0);
    console.log(game);
})
