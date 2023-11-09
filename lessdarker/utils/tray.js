const { Tray, Menu, nativeImage } = require('electron');

function init() {
    let tray;
    const icon = nativeImage.createFromPath('./app/assets/images/logo.png');
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Open' },
        { label: 'Close' }
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Less Darker');
    tray.setTitle('Less Darker');
};

module.exports = { init }