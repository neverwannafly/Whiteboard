const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log(req);
    res.render('workspace', {title:'EaseBoard'});
});

let server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = socketio.listen(server);
io.on('connection', function(socket){
    console.log("Hello World");
});