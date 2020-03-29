const canvas = document.getElementById("whiteboard");

const resolution = RESOLUTION_HD;
const height = window.innerHeight * 0.99;
const width = window.innerWidth * 0.93;

let whiteboard = new Whiteboard(canvas, width, height, resolution);
whiteboard.setColor(COLOR_WHITE);
whiteboard.setBackground(COLOR_BLACK);
whiteboard.setWidth(2);
whiteboard.setCursor(CURSOR_CROSSHAIR);
whiteboard.setMode(MODE_DRAW);

whiteboard.startEventLoop();

let pen = document.getElementById('pen');
let color = document.getElementById('color');
let eraser = document.getElementById('eraser');
let line = document.getElementById('line');

color.addEventListener('click', getColorPicker);
pen.addEventListener('click', function(_){
    whiteboard.setMode(MODE_DRAW);
    // event.target.style.backgroundColor = COLOR_RED;
});
eraser.addEventListener('click', function(_){
    whiteboard.setMode(MODE_ERASE);
});
line.addEventListener('click', function(_){
    whiteboard.setMode(MODE_LINE);
});

function getColorPicker(event) {
    let newDiv = document.getElementById('color-panel');
    let created = false;
    if (newDiv === null || newDiv === undefined) {
        newDiv = document.createElement('div'); created = true;
    }
    newDiv.innerHTML = "";
    newDiv.id = 'color-panel';
    newDiv.style.position = 'absolute';
    newDiv.style.left = `${event.pageX+35}px`;
    newDiv.style.top = `${event.pageY-10}px`;
    newDiv.style.backgroundColor = 'white';
    const colors = [COLOR_BLOOMING_DAHILA, COLOR_ORANGE, COLOR_RED, COLOR_WHITE, COLOR_PINK, COLOR_LIGHT_BLUE];
    newDiv.style.height = '32px';
    newDiv.style.width = `${colors.length*32}px`;
    newDiv.style.display = 'flex';
    newDiv.style.zIndex = '100';
    for (let i=0; i<colors.length; i++) {
        const colorGrid = document.createElement('div');
        colorGrid.id = `${colors[i].slice(1)}`;
        colorGrid.classList.add('color-icons');
        colorGrid.style.backgroundColor = `${colors[i]}`;
        colorGrid.addEventListener('click', dismissColorPicker);
        newDiv.appendChild(colorGrid);
    }
    if (created) { document.body.appendChild(newDiv); }
}

function dismissColorPicker(event) {
    let div = document.getElementById('color-panel');
    whiteboard.setColor(`#${event.target.id}`);
    div.innerHTML = "";
    div.style = "";
}