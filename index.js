import Game from "./src/game.js";
import { GAME_WIDTH, GAME_HEIGHT, GAME_STATES } from "./src/constants.js";

const hud = document.getElementById("hud");

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;


const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);


// animation gameloop

let lastTime = performance.now();

function animate(timestamp = 0) {
    
    let dt = timestamp - lastTime;
    lastTime = timestamp;

    if (game.state == GAME_STATES.RUNNING) {
        game.update(dt);
        game.draw();
    }

    requestAnimationFrame(animate);

}

function init() {
    game.start();
    animate(lastTime);
}

// SET UP START MENU
window.addEventListener("keydown", e => {
    if (e.key === " " && game.state === GAME_STATES.MENU) init();
});

game.showStartMenu();

