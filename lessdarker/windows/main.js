const path = require('path');
const config = {
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    width: 700,
    height: 500,
    backgroundColor: '#ffffff',
    icon: '../../app/favicon.ico',
    show: false,
    closable: false,
    titleBarOverlay: {
        color: '#080808',
        symbolColor: '#202020',
        height: 25
    }
};

function init(window) {
    window.loadFile(`./app/index.html`);
    window.removeMenu();
    window.once('ready-to-show', () => {
        window.show();
    })

    window.webContents.once("dom-ready", () => {
        window.webContents.openDevTools();
    });

    return window;
}

module.exports = { init, config };
