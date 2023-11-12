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

function init(client) {
    client.loadFile(`./app/index.html`);
    client.removeMenu();

    client.on('close', (event) => {
        event.preventDefault();
        client.hide();
    });

    client.once('ready-to-show', () => {
        client.show();
    });

    // client.webContents.once("dom-ready", () => {
    //     client.webContents.openDevTools();
    // });

    return client;
}

module.exports = { init, config };