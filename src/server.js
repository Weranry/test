const express = require('express');
const path = require('path');
const { handleGetApi } = require('./api/getapi');
const { handleGetPic } = require('./api/getpic');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/api/getapi', handleGetApi);
app.get('/api/getpic', handleGetPic);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});