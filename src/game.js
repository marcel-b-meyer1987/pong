import { GAME_STATES } from "./constants.js";
import { Paddle } from "./paddle.js";
import InputHandler from "./inputHandler.js";

export default class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.state = GAME_STATES.MENU;
        this.inputHandler = new InputHandler(this);
        this.objects = {
            paddle: new Paddle(this),
        }
    }

    start() {
        this.state = GAME_STATES.RUNNING;
    }

    update(dt) {
        this.objects.paddle.update(dt);
    }

    draw() {
        // clear canvas
        this.ctx.clearRect(0,0,this.width,this.height);
        // draw all game objects
        this.objects.paddle.draw(this.ctx);
    }

    
}