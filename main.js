import { randomFloat } from "./utils.js";
import { handleInput } from "./input.js";

import { textures } from "./preload.js";

import { Sprite } from "./sprite.js";

import { updateBall } from "./ball.js";
import { createPaddle, updatePaddles } from "./paddle.js";
import { createParticles } from "./particle.js";


const canvas = document.getElementById("mainCanvas");
const context = canvas.getContext("2d");
const fxCanvas = document.getElementById("fxCanvas");
const fxContext = fxCanvas.getContext("2d");
context.imageSmoothingEnabled = false;


// Game properties
const width = 320;
const height = 180;
const frameRate = 120;
let deltaTime = 0;
// possible states ["PAUSE", "RUNNING", "STARTSCREEN", "GAMEOVER"];
let GameState = "STARTSCREEN";

let scorePlayer = 0;
let scoreAI = 0;
let maxScore = 5;

// Entity properties
let paddles = [];
let paddleSpeed = 230;
const paddleWidth = 8;
const paddleHeight = 32;
let ball;
let ballSpeed = 200;

let particles = [];
const maxParticles = 8;
let fx;



handleInput(canvas);

function initialize() {
    scorePlayer = 0;
    scoreAI = 0;

    paddles = [
        createPaddle(24, 
                    height/2 - paddleHeight/2, 
                    paddleSpeed,
                    paddleWidth, 
                    paddleHeight, 
                    textures.BLUEPADDLE),
        createPaddle(width - paddleWidth - 24, 
                    height/2 - paddleHeight/2,
                    paddleSpeed,
                    paddleWidth, 
                    paddleHeight, 
                    textures.REDPADDLE)
    ];

    ball = {
        x: width/2, 
        y: height/2, 
        direction: {
            x: 1, 
            y: randomFloat(-1, 1),
        },
        speed: ballSpeed,
        sprite: textures.BALL
    };


    particles = createParticles(maxParticles, width/2, height/2);


    let anims = {
        spark1: {startIndex: 0, 
                endIndex: 2, 
                currentAnimationFrame: 0, 
                type: "loop"},
        spark2: {startIndex: 3, 
                endIndex: 5, 
                currentAnimationFrame: 3, 
                type: "loop"},      
    }
    
    fx = new Sprite(textures.SPARKFX, 48, 32, 2, 3, anims);
}
function restartRound() {
    paddles[1].y = height/2 - paddleHeight/2;

    ball.x = width/2;
    ball.y = height/2;
    ball.direction = {
        x: 1, 
        y: randomFloat(-1, 1),
    };
}
export function startGame() {
    GameState = "RUNNING";
    initialize();
    lastUpdateTime = performance.now();
    gameLoop(lastUpdateTime);
}



// Interval is used to change animation frame every 0.1s
const animationUpdateInterval = 100;
let lastAnimationUpdateTime = 0;
function updateAndDrawFX(timestamp) {
    let elapsed = timestamp - lastAnimationUpdateTime;
    if (elapsed > animationUpdateInterval) {
        fx.update(fxContext);
        lastAnimationUpdateTime = timestamp;
    }
}


function updateAndDrawParticles() {
    // Update and draw each particle instanciated
    // Reuse the particles when their lifetime is over
    for (let i = 0; i < particles.length; i++) {
        particles[i].run(context);
        if (particles[i].isDead()) {
            let newX = ball.x + randomFloat(-1, 1)
            let newY = ball.y + randomFloat(-1, 1)
            particles[i].recycle(newX, newY);
        }
    }
}


function updateObjects() {
    paddles = updatePaddles(ball, paddles, deltaTime);
    ball = updateBall(ball, paddles, deltaTime);
}
function drawObjects() {
    context.drawImage(paddles[0].sprite, paddles[0].x, paddles[0].y);
    context.drawImage(paddles[1].sprite, paddles[1].x, paddles[1].y);
    context.drawImage(ball.sprite, ball.x - 2, ball.y - 2);
}


function updateScoreBoard() {
    if (ball.x <= -100) 
    {
        scoreAI += 1;
        restartRound();
    } 
    else if (ball.x >= width + 100) {
        scorePlayer += 1;
        restartRound();
    }

    if (scorePlayer === maxScore || scoreAI === maxScore) { 
        GameState = "GAMEOVER";
    }
}
function drawScoreBoard() {
    for (let i = 0; i < scorePlayer; i++) 
    {
        const [x, y] = [113, 165];

        context.drawImage(textures.BLUEPOINT, x + (i * 8), y);
    }

    for (let i = 0; i < scoreAI; i++) 
    {
        const [x, y] = [168, 165];

        context.drawImage(textures.REDPOINT, x + (i * 8), y);
    }
}


function drawBackground() {
    context.clearRect(0, 0, width, height);
    context.drawImage(textures.BACKGROUND, 0, 0);
    context.drawImage(textures.SCOREBOARD, 0, 0);
}
function drawPauseScreen() {
    context.drawImage(textures.PAUSESCREEN, 0, 0);
}
function drawGameOverScreen() {
    if (scorePlayer > scoreAI) {
        context.drawImage(textures.GAMEOVER1, 0, 0);
    } else {
        context.drawImage(textures.GAMEOVER2, 0, 0);
    }
}


// Interval is used to control how many updates will happen every second
const updateInterval = 1000 / frameRate;
let lastUpdateTime = 0;
function gameLoop(timestamp) {
    if (GameState === "PAUSED") { drawPauseScreen(); }
    else if (GameState === "GAMEOVER") { drawGameOverScreen(); }
    else if (GameState === "RUNNING") {
        let elapsed = timestamp - lastUpdateTime;
        deltaTime = elapsed / 1000;
        
        if (elapsed > updateInterval) {
            updateObjects();
            updateScoreBoard();
            
            drawBackground();
            drawScoreBoard();
            drawObjects();
            
            updateAndDrawFX(timestamp);
            updateAndDrawParticles();

            lastUpdateTime = timestamp;
        }
    }

    requestAnimationFrame(gameLoop);
}



// Handle game state changes
window.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.key === 'Escape') {
        if (GameState === "PAUSED") {
            GameState = "RUNNING"
            lastUpdateTime = performance.now();
        }
        else if (GameState === "RUNNING") {
            GameState = "PAUSED";
        }
    }

    if (GameState === "GAMEOVER") {
        if (event.key === 'r' || event.key === 'R') {
            startGame();
        } 
    }
});

// Pause game if browser tab is changed
window.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        GameState = "PAUSED";
    }
});


export {
    GameState,
    width,
    height,
    fx,
}