import Game from "./src/game.js";
import { GAME_WIDTH, GAME_HEIGHT, GAME_STATES } from "./src/constants.js";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;

// ctx.fillStyle = "blue";
// ctx.fillRect(GAME_WIDTH * 0.5 - 40, GAME_HEIGHT - 30, 80, 20);

const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);
// console.log(game);

// console.log(game.objects.paddle);
game.objects.paddle.draw(ctx);


// animation gameloop

let lastTime = performance.now();

function animate(timestamp = 0) {
    
    let dt = timestamp - lastTime;
    lastTime = timestamp;

    game.update(dt);
    game.draw(ctx);

    requestAnimationFrame(animate);

}

animate(lastTime);
