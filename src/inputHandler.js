import { GAME_STATES } from "./constants.js";

export default class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {
            ArrowLeft: {
                    pressed: false
                },
            ArrowRight: {
                    pressed: false
                }
        };

        window.addEventListener("keydown", e => this.registerKey(e.key));
        window.addEventListener("keyup", e => this.deleteKey(e.key))
    }

    registerKey(key) {
        
        if (key === "Escape") this.game.togglePause();       

        // only register ArrowLeft or ArrowRight
        if(
            key === "ArrowLeft" ||
            key === "ArrowRight"
        ) {
            this.keys[key].pressed = true;
        }
    }

    deleteKey(key) {
        if(this.keys[key]) this.keys[key].pressed = false;
    }
}