import { BRICK_DATA } from "./constants.js";
import { collisionCircleVsRect } from "./utils.js";

export class Brick {
    constructor(game, x, y) {
        this.game = game;
        this.fillColor = BRICK_DATA.fillColor;
        this.strokeColor = BRICK_DATA.strokeColor;
        this.width = BRICK_DATA.width;
        this.height = BRICK_DATA.height;
        this.strokeSize = BRICK_DATA.strokeSize;

        this.x = x;
        this.y = y;

        this.score = 10;
        this.markedForRemoval = false;

    }

    update(dt) {
        if (collisionCircleVsRect(this.game.ball, this)) {
            this.markedForRemoval = true;

            // let the ball bounce back
            this.game.ball.speed.y *= -1;
            // this.game.ball.speed.x *= -1;
        }

        // if the brick is marked for removal, 
        // splice it from the objects array
        if (this.markedForRemoval) {
            let index = this.game.objects.indexOf(this);
            if (index > -1) {
                this.game.score += this.score;
                this.game.objects.splice(index, 1);
            }
        }
    }


    draw(ctx) {
        // console.log("draw brick");
        ctx.save()
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeSize;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
    }
}