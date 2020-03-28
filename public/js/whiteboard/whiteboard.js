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
        this.background = COLOR_WHITE;
        // Event Handlers
        this._penDownHandler = null;
        this._penUpHandler = null;
        this._executeActionHandler = null;
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
    _executeAction(event) {
        if (this.state == STATE_PEN_DOWN) {
            switch(this.mode) {
                case MODE_DRAW      : this._draw(event); break;
                case MODE_ERASE     : this._erase(event); break;
                case MODE_IDLE      : console.log("I'm on a break!"); break;
            }
        }
    }
    _draw(event, color=null, radius=null) {
        const nextX = event.clientX - this.origin.x;
        const nextY = event.clientY - this.origin.y;
        this.marker.draw(this.context, this.currX, this.currY, nextX, nextY, color, radius);
        this.currX = nextX;
        this.currY = nextY;
    }
    _erase(event) {
        const color = this.background;
        const radius = 5 * this.marker.getRadius();
        this._draw(event, color, radius);
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
        if (this._penDownHandler===null)        {  this._penDownHandler = this._penDown.bind(this); }
        if (this._executeActionHandler===null)  { this._executeActionHandler = this._executeAction.bind(this); }
        if (this._penUpHandler===null)          { this._penUpHandler = this._penUp.bind(this); }
        this.canvas.addEventListener('mousedown', this._penDownHandler, true);
        this.canvas.addEventListener('mousemove', this._executeActionHandler, true);
        this.canvas.addEventListener('mouseup', this._penUpHandler, true);
    }
    stopEventLoop() {
        this.canvas.removeEventListener('mousedown', this._penDownHandler, true);
        this.canvas.removeEventListener('mousemove', this._executeActionHandler, true);
        this.canvas.removeEventListener('mouseup', this._penUpHandler, true);
    }    
    setBackground(background) {
        this.background = background;
        console.log(this.context.globalCompositeOperation);
        this.context.globalCompositeOperation = 'destination-over';
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.globalCompositeOperation = 'source-over';
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