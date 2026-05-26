import { collision } from "./utils.js";

export default class Ball {
    constructor(game) {
        this.game = game;
        this.size = 12;
        this.width = 24;    // only needed due to the function signature of collision detection
        this.height = 24;   // only needed due to the function signature of collision detection
        this.color = "rgba(239, 26, 93, 0.91)";
        this.x = 400;    // this.game.width * 0.5 - this.size * 0.5;
        this.y = 200;    // Math.round(this.game.height * 0.33); // spawn in the upper third of the game canvas
        this.speed = {
            x: 0.25,
            y: 0.25
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
        }

        // check for collision with ceiling
        if (this.y - this.size <= 0) {
            // this.y = 0;
            this.speed.y *= -1;
        }

        // check for collision with paddle
        let paddle = this.game.objects[0];
        if (this.y + this.size >= paddle.y &&
            this.x <= paddle.x + paddle.width &&
            this.x + this.size >= paddle.x) {
                this.y = this.game.objects[0].y - this.size;
                this.speed.y *= -1;
        }
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