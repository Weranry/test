const express = require('express');
const { createCanvas} = require('canvas');
const { Solar, Lunar } = require('lunar-javascript');
const path = require('path');

const app = express();

// 注册字体
//registerFont(path.join(__dirname, '../public/fonts/arial.ttf'), { family: 'arial' });

function getPerpetualOutput() {
    const solar = Solar.fromDate(new Date());
    const lunar = Lunar.fromDate(new Date());
    const shuJiu = lunar.getShuJiu();
    const shuJiuString = shuJiu ? shuJiu.toFullString() : 'N/A';
    const Fu = lunar.getFu();
    const FuString = Fu ? Fu.toFullString() : 'N/A';

    return {
        SolarYear: solar.getYear().toString() + '年',
        SolarMonth: solar.getMonth().toString() + '月',
        SolarDay: solar.getDay().toString() + '日',
        WeekDay: '星期' + solar.getWeekInChinese(),
        lunarMonth: lunar.getMonthInChinese() + '月',
        lunarDay: lunar.getDayInChinese(),
        ganzhiYear: lunar.getYearInGanZhiByLiChun() + '年',
        ganzhiMonth: lunar.getMonthInGanZhiExact() + '月',
        ganzhiDay: lunar.getDayInGanZhiExact() + '日',
        yuexiang: lunar.getYueXiang() + '月',
        wuhou: lunar.getWuHou(),
        hou: lunar.getHou(),
        shujiu: shuJiuString,
        fu: FuString,
    };
}

app.use(express.static('public'));

app.get('/api/getapi', (req, res) => {
    const data = getPerpetualOutput();
    res.json(data);
});

app.get('/api/getpic', (req, res) => {
    const canvas = createCanvas(400, 300);
    const ctx = canvas.getContext('2d');
    const data = getPerpetualOutput();

    // 背景
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 400, 300);

    // 标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px arial';
    ctx.textAlign = 'center';
    ctx.fillText('万年历', 200, 40);

    // 日历内容
    ctx.font = '16px arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#e74c3c';
    ctx.fillText(data.SolarMonth + data.SolarDay, 50, 100);
    ctx.fillStyle = '#333';
    ctx.font = '14px arial';
    ctx.fillText(data.WeekDay, 50, 130);
    ctx.fillText(data.lunarMonth + data.lunarDay, 50, 160);
    ctx.fillText(data.ganzhiYear, 50, 190);
    ctx.fillText(data.wuhou, 50, 220);

    const buffer = canvas.toBuffer('image/png');
    res.type('image/png');
    res.send(buffer);
});

module.exports = app;