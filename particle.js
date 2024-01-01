import { randomInt, randomFloat } from "./utils.js";


class Particle {
    constructor(x, y, size, color, lifetime) {
        this.initialSize = size;
        this.initialLifetime = lifetime
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = {
            x: randomFloat(-0.3, 0.3),
            y: -1
        };
        this.alpha = 1; // Initial opacity
        this.lifetime = lifetime; // Lifetime in frames
    }
    
    run(ctx)  {
        this.update();
        this.draw(ctx);
    }

    update() {
        this.size *= 0.85;
        this.lifetime -= 1;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
            ctx.arc(Math.round(this.x), 
                    Math.round(this.y), 
                    Math.round(this.size), 
                    0, 2 * Math.PI);
        ctx.fill();
    }

    isDead() {
        if (this.lifetime < 0.0) {
            return true;
        } else {
            return false;
        }
    }

    recycle(x, y) {
        this.x = x;
        this.y = y;
        this.size = this.initialSize;
        this.lifetime = this.initialLifetime;
    }
}


export function createParticles(maxParticles, x, y) {
    let particles = [];

    for (let i = 0; i < maxParticles; i++) {
        let particle = new Particle(x, y, 3, "#736464", randomInt(2, 5));
        particles.push(particle);
    }
    
    return particles;
}
