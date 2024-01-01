export function drawLine(x1, y1, x2, y2, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#f0f0dc";
    ctx.stroke();
}

export function drawCircle(centerX, centerY, radius, ctx) {
    ctx.fillStyle = "#f0f0dc";

    for (let angle = 0; angle < 360; angle++) {
        const x = Math.round(centerX + radius * Math.cos(angle * (Math.PI / 180)));
        const y = Math.round(centerY + radius * Math.sin(angle * (Math.PI / 180)));
        ctx.fillRect(x, y, 1, 1);
    }
}

export function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}