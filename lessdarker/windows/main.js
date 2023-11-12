const path = require('path');
const config = {
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    width: 450,
    height: 250,
    backgroundColor: '#ffffff',
    icon: '../../app/favicon.ico',
    show: false
};

function init(window) {
    window.loadFile(`./app/index.html`);
    window.removeMenu();

    window.on('close', (event) => {
        event.preventDefault();
        window.hide();
    });

    window.once('ready-to-show', () => {
        window.show();
    });

    // window.webContents.once("dom-ready", () => {
    //     window.webContents.openDevTools();
    // });

    return window;
}

module.exports = { init, config };