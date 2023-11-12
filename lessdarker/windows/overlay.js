const path = require('path');
const config = {
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    },
    width: 50,
    height: 15,
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
    y: 5,
    x: 5
};

function init(overlay) {
    overlay.loadFile(`./app/overlay/index.html`);
    overlay.removeMenu();
    overlay.setIgnoreMouseEvents(true);

    // overlay.webContents.once("dom-ready", () => {
    //     overlay.webContents.openDevTools();
    // });

    return overlay;
}

module.exports = { init, config };