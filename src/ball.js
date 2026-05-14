import { collision } from "./utils.js";

export default class Ball {
    constructor(game) {
        this.game = game;
        this.size = 24;
        this.color = "rgba(239, 26, 93, 0.91)";
        this.posX = 400;    // this.game.width * 0.5 - this.size * 0.5;
        this.posY = 200;    // Math.round(this.game.height * 0.33); // spawn in the upper third of the game canvas
        this.speed = {
            x: 0.3,
            y: 0.3
        }
    }

    update(dt) {
        this.posX += this.speed.x * dt;
        this.posY += this.speed.y * dt;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}