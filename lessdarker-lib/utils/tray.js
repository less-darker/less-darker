const { Tray, Menu, nativeImage } = require('electron');

function init() {
    let tray;
    const icon = nativeImage.createFromPath('./app/assets/images/logo.png');
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1' },
        { label: 'Item2' },
        { label: 'Item3' },
        { label: 'Item4' }
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Less Darker');
    tray.setTitle('Less Darker');
};

module.exports = { init }