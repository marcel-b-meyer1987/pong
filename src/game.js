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

    togglePause() {
        if (this.state === GAME_STATES.RUNNING) {
            this.showPauseScreen();
            this.state = GAME_STATES.PAUSE;
         } else if (this.state === GAME_STATES.PAUSE) {
            this.state = GAME_STATES.RUNNING;
         } 
        console.log(this.state);
    }

    update(dt) {
        if (this.state == GAME_STATES.PAUSE) return;

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

    showPauseScreen() {

        this.ctx.save();

        // draw overlay if game is paused
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // display Pause message
        this.ctx.font = "72px sans-serif";
        this.ctx.fillStyle = "hsla(160, 100%, 60%, 0.8)";
        this.ctx.strokeStyle = "hsla(160, 100%, 90%, 0.8)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PAUSE", this.width * 0.5, this.height * 0.5);

        this.ctx.restore();

        return;
    }
    
}