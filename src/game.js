import { GAME_STATES } from "./constants.js";
import { Paddle } from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./inputHandler.js";

export default class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.state = GAME_STATES.MENU;
        this.inputHandler = new InputHandler(this);
        this.objects = [
            new Paddle(this),
            new Ball(this)
        ]
        console.log(this, this.objects);
    }

    start() {
        this.state = GAME_STATES.RUNNING;
    }

    update(dt) {
        this.objects.forEach(obj => {
            obj.update(dt);
        });
    }

    draw() {
        // clear canvas
        this.ctx.clearRect(0,0,this.width,this.height);
        
        // draw all game objects
        this.objects.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    
}