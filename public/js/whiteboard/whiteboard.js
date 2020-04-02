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
        this.buffer = {};
        this.cursor = null;
        // Event Handlers
        this._penDownHandler = null;
        this._penUpHandler = null;
        this._executeActionHandler = null;
        this._mouseLeaveHandler = null;
        this._windowChangeHandler = null;
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
                case MODE_LINE      : this._line(event); break;
                case MODE_IDLE      : console.log("I'm on a break!"); break;
            }
        }
    }
    _penDown(event) {
        this._saveBuffer();
        this.currX = event.pageX - this.origin.x
        this.currY = event.pageY - this.origin.y;
        this.setState(STATE_PEN_DOWN);
    }
    _penUp(event) {
        this._draw(event);
        this._loadBuffer();
    }
    _windowChange(_) {
        console.log("changed");
        this.origin = this.canvas.getBoundingClientRect();
    }
    _mouseLeave() {
        this._loadBuffer();
    }
    _loadBuffer() {
        this.setState(this.buffer.state);
        this.setColor(this.buffer.color);
        this.setWidth(this.buffer.width);
    }
    _saveBuffer() {
        this.buffer.state = this.getState();
        this.buffer.color = this.getColor();
        this.buffer.width = this.getWidth();
    }
    _draw(event) {
        const nextX = event.pageX - this.origin.x;
        const nextY = event.pageY - this.origin.y;
        this.marker.draw(this.context, this.currX, this.currY, nextX, nextY);
        this.currX = nextX;
        this.currY = nextY;
    }
    _erase(event) {
        if (this.getColor() != this.background) {
            this.setColor(this.background);
            this.setWidth(this.getWidth() * 5);
        }
        this._draw(event);
    }
    _line(_) {
        console.log("making line! Keep going");
    }
    startEventLoop() {
        if (this._penDownHandler===null)        {  this._penDownHandler = this._penDown.bind(this); }
        if (this._executeActionHandler===null)  { this._executeActionHandler = this._executeAction.bind(this); }
        if (this._penUpHandler===null)          { this._penUpHandler = this._penUp.bind(this); }
        if (this._mouseLeaveHandler===null)     { this._mouseLeaveHandler = this._mouseLeave.bind(this); }
        if (this._windowChangeHandler===null)   { this._windowChangeHandler = this._windowChange.bind(this); }
        this.canvas.addEventListener('mousedown', this._penDownHandler, true);
        this.canvas.addEventListener('mousemove', this._executeActionHandler, true);
        this.canvas.addEventListener('mouseup', this._penUpHandler, true);
        this.canvas.addEventListener('mouseleave', this._mouseLeaveHandler, true);
        window.addEventListener('resize', this._windowChangeHandler, true);
    }
    stopEventLoop() {
        this.canvas.removeEventListener('mousedown', this._penDownHandler, true);
        this.canvas.removeEventListener('mousemove', this._executeActionHandler, true);
        this.canvas.removeEventListener('mouseup', this._penUpHandler, true);
        this.canvas.removeEventListener('mouseleave', this._mouseLeaveHandler, true);
        window.removeEventListener('resize', this._windowChangeHandler, true);
    }    
    setBackground(background) {
        this.background = background;
        this.context.globalCompositeOperation = 'destination-over';
        this.context.fillStyle = this.background;
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.globalCompositeOperation = 'source-over';
    }

    // setters and getters
    setColor(color) {
        this.marker.setColor(this.context, color);
    }
    getColor() {
        return this.marker.getColor();
    }
    setWidth(width) {
        this.marker.setRadius(this.context, width);
    }
    getWidth() {
        return this.marker.getRadius();
    }
    setMode(mode) {
        this.mode = mode;
    }
    getMode() {
        return this.mode;
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    setCursor(cursor) {
        this.cursor = cursor;
        this.canvas.style.cursor = this.cursor;
    }
};