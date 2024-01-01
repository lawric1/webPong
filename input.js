let pressed = {};
const COMMANDS = {
    up: ["w", "W", "ArrowUp"],
    down: ["s", "S", "ArrowDown"]
}

export function handleInput(canvas) {
    window.addEventListener("keydown", (event) => {
        event.preventDefault();
        pressed[event.key] = true;
    });
    
    window.addEventListener("keyup", (event) => {
        event.preventDefault();
        pressed[event.key] = false;
    });
}

export function keyPressed(command) {
    let validKeys = COMMANDS[command];

    for (let i = 0; i < validKeys.length; i++) {
        let key = validKeys[i];

        if (pressed[key]) {
            return true;
        }
    }

    return false;
}