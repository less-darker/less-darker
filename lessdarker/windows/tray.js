const { Tray, Menu, nativeImage, app } = require('electron');
const path = require('path');
let tray;

function init(client) {
    const icon = nativeImage.createFromPath(path.join(__dirname, '/assets/logo.png'));
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show', click: () => show(client) },
        { label: 'Hide', click: () => hide(client) },
        { label: 'Close', click: close }
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Less Darker');
    tray.setTitle('Less Darker');
};

function show(client) {
    client.show();
}

function hide(client) {
    client.hide();
}

function close() {
    app.exit();
}

module.exports = { tray, init }