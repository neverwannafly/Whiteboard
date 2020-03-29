// window.onload = function() {

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
    
// }