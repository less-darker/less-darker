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
    // host process to talk between processes for the future possibly
    return host;
}

module.exports = { init, config };
