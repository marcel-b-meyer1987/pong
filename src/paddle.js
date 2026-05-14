export class Paddle {
    constructor(game) {
        this.game = game;
        this.color = "rgba(0, 133, 160, 0.8)";
        this.width = 80;
        this.height = 20;
        this.bottomMargin = 10;

        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height - this.bottomMargin;
        this.speed = {
            x: 1,
        }

    }

    update(dt = 1) {
            if(this.game.inputHandler.keys["ArrowLeft"].pressed) {
                if (this.x >= 0) this.x -= this.speed.x * dt;
            } else if ((this.game.inputHandler.keys["ArrowRight"].pressed)) {
                if (this.x + this.width <= this.game.width) this.x += this.speed.x * dt;
            }
        }
        // this.draw(this.game.ctx);


    draw(ctx) {
        ctx.save()
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}