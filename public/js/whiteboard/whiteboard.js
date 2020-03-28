class Whiteboard {
    constructor(canvas, width, height, resolution) {
        // Class members
        this.canvas = canvas;
        this.height = height;
        this.width = width;
        this.resolution = resolution;
        this.context = this._setupContextBoard();
        this.marker = new Marker();
        this.mode = MODE_IDLE;
        this.state = STATE_PEN_UP;
        this.origin = this.canvas.getBoundingClientRect();
        this.currX = 0;
        this.currY = 0;
        // Event Handlers
        this._penDownHandler = null;
        this._penUpHandler = null;
        this._drawHandler = null;
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
    _draw(event) {
        if (this.state == STATE_PEN_DOWN) {
            if (this.mode == MODE_DRAW) {
                const nextX = event.clientX - this.origin.x;
                const nextY = event.clientY - this.origin.y;
                this.marker.draw(this.context, this.currX, this.currY, nextX, nextY);
                this.currX = nextX;
                this.currY = nextY;
            }
        }
    }
    _penDown(event) {
        this.state = STATE_PEN_DOWN;
        this.currX = event.clientX - this.origin.x
        this.currY = event.clientY - this.origin.y;
    }
    _penUp(event) {
        this._draw(event);
        this.state = STATE_PEN_UP;
    }
    startEventLoop() {
        if (this._penDownHandler===null)    { this._penDownHandler = this._penDown.bind(this); }
        if (this._drawHandler===null)       { this._drawHandler = this._draw.bind(this); }
        if (this._penUpHandler===null)      { this._penUpHandler = this._penUp.bind(this); }
        this.canvas.addEventListener('mousedown', this._penDownHandler, true);
        this.canvas.addEventListener('mousemove', this._drawHandler, true);
        this.canvas.addEventListener('mouseup', this._penUpHandler, true);
    }
    stopEventLoop() {
        this.canvas.removeEventListener('mousedown', this._penDownHandler, true);
        this.canvas.removeEventListener('mousemove', this._drawHandler, true);
        this.canvas.removeEventListener('mouseup', this._penUpHandler, true);
    }    
    setColor(color) {
        this.marker.setColor(this.context, color);
    }
    setWidth(width) {
        this.marker.setRadius(width);
    }
    setMode(mode) {
        this.mode = mode;
    }
};