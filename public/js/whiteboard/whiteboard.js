class Whiteboard {
    constructor(canvas, width, height, resolution) {
        this.canvas = canvas;
        this.height = height;
        this.width = width;
        this.resolution = resolution;
        this.context = this._setupContextBoard();
        this.marker = new Marker();
        this.drawMode = false;
        this.origin = null;
        this.currX = 0;
        this.currY = 0;
    }
    _setupContextBoard() {
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.canvas.width = Math.ceil(this.width * this.resolution);
        this.canvas.height = Math.ceil(this.height * this.resolution);
        let context = this.canvas.getContext('2d');
        context.scale(this.resolution, this.resolution);
        return context;
    }
    _draw(x1, y1, x2, y2) {
        if (this.drawMode) {
            this.marker.draw(this.context, x1, y1, x2, y2);
        }
    }
    _penDown() {
        this.drawMode = true;
    }
    _penUp() {
        this.drawMode = false
    }
    startEventLoop() {
        this.origin = this.canvas.getBoundingClientRect();

        this.canvas.addEventListener('mousedown', (event) => {
            this._penDown();
            this.currX = event.clientX - this.origin.x
            this.currY = event.clientY - this.origin.y;
        });
        this.canvas.addEventListener('mousemove', event => {
            const nextX = event.clientX - this.origin.x;
            const nextY = event.clientY - this.origin.y;
            this._draw(this.currX, this.currY, nextX, nextY);
            this.currX = nextX;
            this.currY = nextY;
        });
        this.canvas.addEventListener('mouseup', (event) => {
            const nextX = event.clientX - this.origin.x;
            const nextY = event.clientY - this.origin.y;
            this._draw(this.currX, this.currY, nextX, nextY);
            this._penUp();
        });
    }
    stopEventLoop() {
        this.canvas.removeEventListener('mousedown', (event) => {
            this._penDown();
            this.currX = event.clientX - this.origin.x
            this.currY = event.clientY - this.origin.y;
        });
        this.canvas.removeEventListener('mousemove', event => {
            const nextX = event.clientX - this.origin.x;
            const nextY = event.clientY - this.origin.y;
            this._draw(this.currX, this.currY, nextX, nextY);
            this.currX = nextX;
            this.currY = nextY;
        });
        this.canvas.removeEventListener('mouseup', (event) => {
            const nextX = event.clientX - this.origin.x;
            const nextY = event.clientY - this.origin.y;
            this._draw(this.currX, this.currY, nextX, nextY);
            this._penUp();
        });
    }    
    setColor(color) {
        this.marker.setColor(this.context, color);
    }
    setWidth(width) {
        this.marker.setRadius(width);
    }
};