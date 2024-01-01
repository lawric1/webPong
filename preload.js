let imageUrls = {
    BLUEPADDLE: "./assets/bluepaddle.png", 
    REDPADDLE: "./assets/redpaddle.png", 
    BALL: "./assets/ball.png",
    SPARKFX: "./assets/fx1.png",
    SCOREBOARD: "./assets/scoreboard.png",
    BLUEPOINT: "./assets/bluepoint.png",
    REDPOINT: "./assets/redpoint.png",
    BACKGROUND: "./assets/background.png",
    PAUSESCREEN: "./assets/pausescreen.png",
    STARTSCREEN: "./assets/startscreen.png",
    GAMEOVER1: "./assets/gameover1.png",
    GAMEOVER2: "./assets/gameover2.png"
};

let textures = {};

export function preloadImages(callback) {
    let loadedImages = 0;
    let size = Object.keys(imageUrls).length;

    for (const [key, value] of Object.entries(imageUrls)) {
        const img = new Image();
        img.onload = () => {
            loadedImages += 1;
            if (loadedImages === size) {
                callback();
            }
        };
        img.src = value;
        textures[key] = img;
    }
}

export { textures };