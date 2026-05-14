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
        // only register ArrowLeft or ArrowRight
        // console.log(event.key);
        if(
            key === "ArrowLeft" ||
            key === "ArrowRight"
        ) {
            this.keys[key].pressed = true;
        }
        // console.log(this.keys);
    }

    deleteKey(key) {
        this.keys[key].pressed = false;
        // console.log(this.keys);
    }
}