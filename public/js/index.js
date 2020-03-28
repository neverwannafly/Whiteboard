// window.onload = function() {

    const canvas = document.getElementById("whiteboard");

    const resolution = RESOLUTION_HD;
    const height = window.innerHeight * 0.95;
    const width = window.outerWidth * 0.95;
    
    let whiteboard = new Whiteboard(canvas, width, height, resolution);
    whiteboard.setColor(COLOR_RED);
    whiteboard.setBackground(COLOR_BLACK);
    whiteboard.setWidth(2);
    whiteboard.setMode(MODE_DRAW);

    whiteboard.startEventLoop();
    
// }