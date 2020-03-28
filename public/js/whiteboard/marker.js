class Marker {
    constructor() {
        this.color;
        this.radius = 1;
    }
    setColor(context, color) {
        this.color = color;
        context.fillStyle = this.color;
    }
    setRadius(radius) {
        this.radius = radius;
    }
    getColor() {
        return this.color;
    }
    getRadius() {
        return this.radius;
    }
    draw(context, x1, y1, x2, y2) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.lineWidth = this.radius;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.closePath();
    }
}