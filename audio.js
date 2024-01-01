let SFX = {
    ballhit: "./assets/ballhit.wav"
}

export function playSFX(name) {
    let file = SFX[name];
    var sound = new Audio(file);
    sound.play();
}