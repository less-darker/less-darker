const { Tray, Menu, nativeImage, app } = require('electron');
const path = require('path');
let tray;
let mainWindow;

function init(main) {
    if (main) mainWindow = main;
    const icon = nativeImage.createFromPath(path.join(__dirname, '/assets/logo.png'));
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show', click: show },
        { label: 'Hide', click: hide },
        { label: 'Close', click: close }
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Less Darker');
    tray.setTitle('Less Darker');
};

function show() {
    mainWindow.show();
}

function hide() {
    mainWindow.hide();
}

function close() {
    app.exit();
}

module.exports = { tray, init }