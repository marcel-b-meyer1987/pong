import Game from "./src/game.js";
import { GAME_WIDTH, GAME_HEIGHT, GAME_STATES } from "./src/constants.js";

const hud = document.getElementById("hud");

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;


const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);


// animation gameloop

let lastTime = undefined;

function animate(timestamp = 0) {
    
    let dt = timestamp - (lastTime || performance.now());
    lastTime = timestamp;

    if (game.state == GAME_STATES.RUNNING) {
        game.update(dt);
        game.draw();
    }

    requestAnimationFrame(animate);

}

function init() {
    lastTime = performance.now();
    game.state = GAME_STATES.RUNNING;
    game.hud.init();
    animate(lastTime);
}

// SET UP START MENU
window.addEventListener("keydown", e => {
    if (e.key === " " && (game.state === GAME_STATES.MENU || game.state === GAME_STATES.LEVEL_UP || game.state === GAME_STATES.GAME_OVER)) init();
});

game.showStartMenu();

