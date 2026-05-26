import { BRICK_DATA } from "./constants.js";

export class Brick {
    constructor(x, y) {
        
        this.fillColor = BRICK_DATA.fillColor;
        this.strokeColor = BRICK_DATA.strokeColor;
        this.width = BRICK_DATA.width;
        this.height = BRICK_DATA.height;
        this.strokeSize = BRICK_DATA.strokeSize;

        this.x = x;
        this.y = y;

        this.markedForRemoval = false;

    }

    update(dt) {
        
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