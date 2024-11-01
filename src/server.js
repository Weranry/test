const express = require('express');
const path = require('path');
const { handleGetApi } = require('./api/getapi');
const { handleGetPic } = require('./api/getpic');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.get('/api/getapi', handleGetApi);
app.get('/api/getpic', handleGetPic);

// 移除 app.listen，因为 Vercel 会自动处理这部分
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

// 导出 app 以供 Vercel 使用
module.exports = app;