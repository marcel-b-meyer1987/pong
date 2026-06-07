import { GAME_HEIGHT } from "./constants.js";
import { collisionCircleVsRect } from "./utils.js";


export default class Ball {
    constructor(game) {
        this.game = game;
        this.size = 12;
        this.width = 24;    // only needed due to the function signature of collision detection
        this.height = 24;   // only needed due to the function signature of collision detection
        this.color = "rgba(239, 26, 93, 0.91)";
        this.flickerColor = "rgba(239, 26, 93, 0.51)";
        this.baseX = this.game.width * 0.5;
        this.baseY = this.game.height * 0.3;
        this.baseSpeedX = 0.15;
        this.baseSpeedY = 0.25;
        this.speedModifier = 1;
        this.speed = {
            x: 0,
            y: 0
        };

        // for iFrames
        this.immunity = false;
        this.immunityTimer = 0;
        this.immunityDuration = 1000;
        this.flickerTimer = 0;
        this.flickerInterval = 10;
        this.flickerFrame = 0;

        this.resetPos();
        this.resetSpeed();
    }
    
    resetPos() {
        this.x = this.baseX; 
        this.y = this.baseY; 
    }

    resetSpeed() {
        this.speed.x = this.baseSpeedX;
        this.speed.y = this.baseSpeedY;
        this.speedModifier = 1;
    }

    update(dt) {
        this.x += this.speed.x * this.speedModifier * dt;
        this.y += this.speed.y * this.speedModifier * dt;

        const paddle = this.game.paddle;

        if (this.immunity) {
            this.immunityTimer += dt;
            if(this.immunityTimer >= this.immunityDuration) {
                this.immunity = false;
                console.log("immunity off");
                this.immunityTimer = 0;
            }
        }

        // check for collision with left wall
        if (this.x - this.speed.x * this.speedModifier - this.size <= 0) {
            this.x = this.size;
            this.speed.x = this.baseSpeedX;
        }

        // check for collision with right wall
        if (this.x + this.speed.x * this.speedModifier + this.size >= this.game.width) {
            this.x = this.game.width - this.size;
            this.speed.x = -this.baseSpeedX;
        }
        
        // check for collision with ceiling
        if (this.y - this.size <= 0) {
            this.y = 0 + this.size + 1;
            this.speedModifier += 0.1;
            this.speed.y *= -1;
        }

        // check for collision with bottom
        if (this.y + this.size >= this.game.height) {
                this.y = this.game.height - this.size - 1;
                this.speed.y = Math.abs(this.speed.y) * (-1);
                if(!this.immunity) {
                    this.game.reduceUps();
                    this.immunity = true;
                    this.game.lostUps++;
                }
                console.log("Collision with ground!");
                console.log(this, this.objects, `${this.game.ups} ups`);
        }

        // check for collision with paddle
        if (collisionCircleVsRect(this, paddle)) {
                console.log("Collision with paddle!");
                console.log(this, this.objects, `${this.game.ups} ups`);
                this.y = paddle.y - this.size - 1;
                this.speed.y *= -1;
                this.speedModifier += (0.1 / this.game.level);
        }
    }


    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        if (this.immunity) {
            ctx.fillStyle = this.flickerColor;
        } else {
            ctx.fillStyle = this.color;
        }

        ctx.fill();
        ctx.restore();
    }
}