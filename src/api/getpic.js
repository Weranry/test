const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const { getPerpetualOutput } = require('../components/calendar');

registerFont(path.join(__dirname, '../fonts/simhei.ttf'), { family: 'simhei' });

function handleGetPic(req, res) {
    const canvas = createCanvas(400, 300);
    const ctx = canvas.getContext('2d');
    const data = getPerpetualOutput();

    // Background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 400, 300);

    // Title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 20px simhei';
    ctx.textAlign = 'center';
    ctx.fillText('万年历', 200, 30);

    // Calendar content
    ctx.font = '14px simhei';
    ctx.textAlign = 'left';
    let y = 60;
    Object.entries(data).forEach(([key, value]) => {
        ctx.fillText(`${key}: ${value}`, 20, y);
        y += 20;
    });

    const buffer = canvas.toBuffer('image/png');
    res.type('image/png');
    res.send(buffer);
}

module.exports = { handleGetPic };