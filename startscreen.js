import { GameState, startGame } from "./main.js";
import { preloadImages, textures } from "./preload.js";

const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");

function update(timestamp) {
    if (GameState === "STARTSCREEN") {
        context.drawImage(textures.STARTSCREEN, 0, 0);
    
        requestAnimationFrame(update);
    }
}

preloadImages(update);


window.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (GameState === "STARTSCREEN")
    {
        startGame();
    }
});