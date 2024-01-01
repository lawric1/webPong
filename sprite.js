class Sprite {
    constructor(spritesheet, width, height, rows, cols, animations) {
        this.spritesheet = spritesheet;
        this.spritesheetWidth = width;
        this.spritesheetHeight = height;
        this.rows = rows;
        this.cols = cols
        this.frameWidth = width / cols;
        this.frameHeight = height / rows;
        this.animations = animations;
        this.currentAnimationPlaying = "";
    }

    play(name, x, y) {
        this.currentAnimationPlaying = name;
        this.originX = x;
        this.originY = y;
    }
    
    update(ctx) {
        if (this.currentAnimationPlaying === "") { return; }

        let anim = this.animations[this.currentAnimationPlaying];

        anim.currentAnimationFrame += 1;

        if (anim.currentAnimationFrame > anim.endIndex)
        {
            anim.currentAnimationFrame = anim.startIndex;
            this.currentAnimationPlaying = "";

            ctx.clearRect(0, 0, 320, 180);
            return;
        }

        let row = Math.floor(anim.currentAnimationFrame / this.cols);
        let column = anim.currentAnimationFrame % this.cols;

        this.drawFrame(ctx, row, column);
    }

    draw(ctx, x, y) {
        ctx.drawImage(this.spritesheet, x, y);
    }

    drawFrame(ctx, row, col) {
        ctx.clearRect(0, 0, 320, 180);
        ctx.drawImage(this.spritesheet, 
                    col * this.frameWidth, 
                    row * this.frameHeight,
                    this.frameWidth, this.frameHeight,
                    this.originX, this.originY,
                    this.frameWidth, this.frameHeight);
    }
}

export { Sprite };