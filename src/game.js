// DIETER

import { BRICK_DATA, GAME_STATES, GAME_WIDTH } from "./constants.js";
import { Paddle } from "./paddle.js";
import Ball from "./ball.js";
import InputHandler from "./inputHandler.js";
import { Hud } from "./hud.js";
import { levels } from "./levels.js";
import { Brick } from "./brick.js";

export default class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.ups = 3;
        this.score = 0;
        this.level = 1;
        this.lastTime = 0;
        console.log(this.lastTime);
        this.state = GAME_STATES.MENU;
        this.inputHandler = new InputHandler(this);
        this.hud = new Hud(this);
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.objects = [
            this.paddle,
            this.ball,
            ...this.createBricks(this.level)
        ];
        console.log(this);
    }

    init() {
        console.log("init()");
        this.lastTime = performance.now();
        this.state = GAME_STATES.RUNNING;
        console.log(this.state);
        this.hud.init();
        this.animate(this.lastTime);
    }

    start() {
        this.lastTime = performance.now();
        this.state = GAME_STATES.RUNNING;
        console.log(this.state);
        this.hud.init();
    }

    animate(timestamp = 0) {
        const dt = timestamp - this.lastTime;
        this.lastTime = timestamp;
    
        if (this.state == GAME_STATES.RUNNING) {
            this.update(dt);
            this.draw();
        }
    
        requestAnimationFrame(t => this.animate(t));
    }

    update(dt) {

        if (this.ups < 1) this.gameOver();
        
        // if game state is not RUNNING, do not update
        if (!this.state == GAME_STATES.RUNNING) return; 

        // if no more bricks among the game objects: level up!
        if (!this.objects.some((obj) => obj instanceof Brick)) {
            this.levelUp();
        } else {
        
        // otherwise, update all game objects
                this.objects.forEach(obj => {
                obj.update(dt);
            });
            this.hud.update();
        }
    }

    draw() {      

        // clear canvas
        this.ctx.clearRect(0,0,this.width,this.height);
        
        // draw all game objects
        this.objects.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    togglePause() {
        if (this.state === GAME_STATES.RUNNING) {
            this.showPauseScreen();
            this.state = GAME_STATES.PAUSE;
            console.log(this.state);
         } else if (this.state === GAME_STATES.PAUSE) {
            this.state = GAME_STATES.RUNNING;
            console.log(this.state);
         } 
        // console.log(this.state);
    }

    showStartMenu() {

        this.ctx.save();

        // draw overlay if game is paused
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // display Pause message
        this.ctx.font = "72px sans-serif";
        this.ctx.fillStyle = "hsla(160, 100%, 60%, 0.8)";
        this.ctx.strokeStyle = "hsla(160, 100%, 90%, 0.8)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PRESS SPACE TO START", this.width * 0.5, this.height * 0.5, GAME_WIDTH * 0.85);

        this.ctx.restore();

        return;
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

    createBricks(level) {

        const map = levels[level-1];
        const rows = map.length;
        const cols = map[0].length;
        const bricks = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {

                // if there is a 1 at position map[row][col], 
                // add a brick at the respective position in the canvas

                if (map[row][col] === 1) {
                    bricks.push(new Brick(
                        this,
                        col * BRICK_DATA.width,
                        row * BRICK_DATA.height + BRICK_DATA.topMargin
                    ));
                }
            }
        }

        return bricks;
    }

    reduceUps() {
        this.ups--;
        this.hud.updateUpsDisplay();
    }

    gameOver() {
        
        this.state = GAME_STATES.GAME_OVER;
        this.showGameOverScreen();
        console.log(this.state);
        
        // reset ball params
        this.ball.resetPos();
        this.ball.resetSpeed();
        
        // reset game params
        this.score = 0;
        this.level = 1;
        this.ups = 3;
        this.hud.update();

        // filter all remaining bricks out of this.objects array
        this.objects = this.objects.filter(obj => obj instanceof Paddle || obj instanceof Ball);

        // // Go back to Level 1 = create bricks for the level and 
        // push them flat into the this.objects array
        this.objects.push(...this.createBricks(this.level));
        
    }

    showGameOverScreen() {
        console.log("showGameOverScreen()");
        console.log(this, this.objects, `${this.ups} ups`);
        
        this.ctx.save();

        // draw overlay if game is paused
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // display Game Over message
        this.ctx.font = "72px sans-serif";
        this.ctx.fillStyle = "hsla(160, 100%, 60%, 0.8)";
        this.ctx.strokeStyle = "hsla(160, 100%, 90%, 0.8)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.width * 0.5, this.height * 0.5);
        this.ctx.fillText("Press Spacebar to try again", this.width * 0.5, this.height * 0.5 + 80, GAME_WIDTH * 0.85);

        this.ctx.restore();

        return;
    }

    levelUp() {
        console.log("Level up!");
        console.log(this.ball.speed, `${this.ups} ups`);

        this.showlevelUpScreen()
        // maybe show a short animation to give visual indication over level-up to the player

        this.state = GAME_STATES.LEVEL_UP;
        console.log(this.state);

        // reset ball params
        this.ball.resetPos();
        this.ball.resetSpeed();

        // reset paddle params
        this.paddle.resetPos();
        this.paddle.resetSpeed();

        this.level++;
        this.hud.update();
        console.log(this.ball.speed);

        // filter all remaining bricks out of this.objects array //ISSUE: IS THIS REALLY NEEDED?
        this.objects = this.objects.filter(obj => obj instanceof Paddle || obj instanceof Ball);

        // create bricks for the new level and 
        // push them flat into the this.objects array
        this.objects.push(...this.createBricks(this.level));
    }

    showlevelUpScreen() {

        this.ctx.save();

        // draw overlay
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, this.width, this.height);

        // display Level Up message
        this.ctx.font = "72px sans-serif";
        this.ctx.fillStyle = "hsla(160, 100%, 60%, 0.8)";
        this.ctx.strokeStyle = "hsla(160, 100%, 90%, 0.8)";
        this.ctx.textAlign = "center";
        this.ctx.fillText("LEVEL UP!", this.width * 0.5, this.height * 0.5, GAME_WIDTH * 0.85);
        this.ctx.fillText("Press Space to continue", this.width * 0.5, this.height * 0.5 + 80, GAME_WIDTH * 0.85);

        this.ctx.restore();

        return;
    }
    
}