const { host, main, overlay } = require('./windows');
const tray = require('./utils/tray');
const hotkeys = require('./utils/hotkeys');

const lessdarker = { host, main, overlay, tray, hotkeys };

module.exports = lessdarker;
