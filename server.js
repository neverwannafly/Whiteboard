const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`listening on port ${port}`));