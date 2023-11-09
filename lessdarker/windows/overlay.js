const path = require('path');
const config = {
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    // maxWidth: 10,
    // maxHeight: 10,
    width: 50,
    height: 20,
    show: false,
    frame: false,
    focusable: false,
    closable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: false,
    movable: false,
    fullscreenable: false,
    skipTaskbar: true,
    title: '',
    x: 0,
    y: 0,
    titleBarOverlay: {
        color: '#080808',
        symbolColor: '#202020',
        height: 25
    }
};

function init(overlay, gameWindow) {
    overlay.loadFile(`./app/overlay/index.html`);
    overlay.removeMenu();
    overlay.once('ready-to-show', () => {
        overlay.show();
    })

    // overlay.webContents.once("dom-ready", () => {
    //     overlay.webContents.openDevTools();
    // });

    return overlay;
}

module.exports = { init, config };
