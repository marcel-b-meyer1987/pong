import { GAME_HEIGHT } from "./constants.js";


export default class Ball {
    constructor(game) {
        this.game = game;
        this.size = 12;
        this.width = 24;    // only needed due to the function signature of collision detection
        this.height = 24;   // only needed due to the function signature of collision detection
        this.color = "rgba(239, 26, 93, 0.91)";
        this.x = this.game.width * 0.5 - this.size; 
        this.y = 100; //Math.floor(this.game.height * 0.3);
        this.speed = {
            x: 0.15,
            y: 0.15
        }
    }

    update(dt) {
        this.x += this.speed.x * dt;
        this.y += this.speed.y * dt;

        // check for collision with left & right wall
        if (this.x - this.size <= 0) {
            // this.x = 0;
            this.speed.x *= -1;
        }

        if (this.x + this.size >= this.game.width) {
            this.x = this.game.width - this.size;
            this.speed.x *= -1;
        }

        // check for collision with bottom
        if (this.y + this.size >= this.game.height) {
            this.y = this.game.height - this.size;
            this.speed.y *= -1;
            this.game.reduceUps();
        }

        // check for collision with ceiling
        if (this.y - this.size <= 0) {
            // this.y = 0;
            this.speed.y *= -1;
        }

        // check for collision with paddle
        let paddle = this.game.paddle;
        if (this.y + this.size >= paddle.y &&
            this.x <= paddle.x + paddle.width &&
            this.x + this.size >= paddle.x) {
                this.y = this.game.objects[0].y - this.size;
                this.speed.y *= -1;
        }

        // // check for collision with the ground
        // if (this.y + this.size <= GAME_HEIGHT &&
        //     this.x < paddle.x + paddle.width &&
        //     this.x + this.width > paddle.x) {
        //         // bla
        //     }
        
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}