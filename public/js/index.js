// window.onload = function() {

    const canvas = document.getElementById("whiteboard");

    const resolution = RESOLUTION_HD;
    const height = window.innerHeight * 0.8;
    const width = window.outerWidth * 0.8;
    const color = COLOR_BLACK;
    
    let whiteboard = new Whiteboard(canvas, width, height, resolution);
    whiteboard.setColor(color);
    whiteboard.setWidth(3);

    whiteboard.startEventLoop();
    
// }