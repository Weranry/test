const { getPerpetualOutput } = require('../components/calendar');

function handleGetApi(req, res) {
    const data = getPerpetualOutput();
    res.json(data);
}

module.exports = { handleGetApi };