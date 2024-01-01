import { width, height } from "./main.js"
import { keyPressed } from "./input.js";


export function createPaddle(x, y, speed, paddleWidth, paddleHeight, sprite) {
    return {
        x: x,
        y: y,
        width: paddleWidth,
        height: paddleHeight,
        centerX: x + width / 2,
        centerY: y + height / 2,
        speed: speed,
        sprite: sprite
    };
}

export function updatePaddles(ball, paddles, deltaTime) {
    paddles = updateAI(ball, paddles, deltaTime);

    // Player input
    if (keyPressed("up")) {
        paddles[0].y -= Math.round(paddles[0].speed * deltaTime);
    }
    
    if (keyPressed("down")) {
        paddles[0].y += Math.round(paddles[0].speed * deltaTime);
    }
    

    // Handle wall bounds and update center position
    for (let i = 0; i < paddles.length; i++) {
        // Top wall
        if (paddles[i].y <= 0) {
            paddles[i].y = 0;
        }
        
        // Bottom wall
        if (paddles[i].y >= height - paddles[i].height) {
            paddles[i].y = height - paddles[i].height;
        }
    
        paddles[i].centerX = paddles[i].x + paddles[i].width/2;
        paddles[i].centerY = paddles[i].y + paddles[i].height/2;
    }

    return paddles;
}

function updateAI(ball, paddles, deltaTime) {
    let topCorner = paddles[1].centerY - paddles[1].height/2;
    let bottomCorner = paddles[1].centerY + paddles[1].height/2;

    // Ball is above paddle
    if (ball.y < topCorner) {
        paddles[1].y -= Math.round(paddles[1].speed * deltaTime * 0.6);
    }
    // Ball is below paddle
    else if (ball.y > bottomCorner) {
        paddles[1].y += Math.round(paddles[1].speed * deltaTime * 0.6);
    }

    return paddles;
}