const path = require('path');
const config = {
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    show: false,
    frame: false,
    focusable: false,
    closable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    title: ''
};

function init(host) {
    return host;
}

module.exports = { init, config };
