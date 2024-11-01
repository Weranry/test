const express = require('express');
const path = require('path');
const { handleGetApi } = require('../src/utils/getapi');
const { handleGetPic } = require('../src/utils/getpic');

const app = express();

// 静态文件服务
app.use(express.static(path.join(__dirname, '../public')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));

// API 路由
app.get('/api/getapi', handleGetApi);
app.get('/api/getpic', handleGetPic);

// 处理根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 处理 /card 路由
app.get('/card', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/card.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;