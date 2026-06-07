import Game from "./src/game.js";
import { GAME_WIDTH, GAME_HEIGHT, GAME_STATES } from "./src/constants.js";

const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;


const game = new Game(ctx, GAME_WIDTH, GAME_HEIGHT);

// SET UP START MENU
game.hud.update();
game.showStartMenu();



