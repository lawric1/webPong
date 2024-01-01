import { randomFloat } from "./utils.js";
import { fx, height } from "./main.js"
import { playSFX } from "./audio.js";

export function updateBall(ball, paddles, deltaTime) {
    paddles.forEach(paddle => {
        let distanceToPaddle = Math.abs(ball.x - paddle.centerX);
        
        let isBellowTopCorner   = ball.y > paddle.centerY - paddle.height/2;
        let isAboveBottomCorner = ball.y < paddle.centerY + paddle.height/2;
        let isTouching = distanceToPaddle <= 6 && 
                         isBellowTopCorner && 
                         isAboveBottomCorner;
    
        
        if (isTouching) { 
            if (ball.y < paddle.centerY) { ball.direction.y = randomFloat(-0.8, -0.2); }
            else if (ball.y > paddle.centerY) { ball.direction.y = randomFloat(0.2, 0.8); }
            else { ball.direction.y = randomFloat(-1 , 1); }
        }
    
        if (isTouching && paddle === paddles[0]) { 
            ball.direction.x = 1;
            ball.x += 6;
            fx.play("spark1", ball.x - 7, ball.y - 7);
            playSFX("ballhit");
        }
    
        else if (isTouching && paddle === paddles[1]) { 
            ball.direction.x = -1; 
            ball.x -= 6;
            fx.play("spark2", ball.x - 9, ball.y - 7);
            playSFX("ballhit");
        }        
    });

    // Handle wall bounds
    if (ball.y <= 4 && ball.direction.y < 0 || 
        ball.y >= height - 4 && ball.direction.y > 0) 
    {
        ball.direction.y *= -1;
        playSFX("ballhit");
    }

    let velocityX = Math.round(ball.speed * ball.direction.x * deltaTime);
    let velocityY = Math.round(ball.speed * ball.direction.y * deltaTime);

    ball.x += velocityX;
    ball.y += velocityY;

    return ball;
}