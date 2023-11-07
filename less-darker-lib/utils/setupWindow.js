const { protocol, BrowserWindow } = require('electron');
const path = require('path');
const Protocol = require("../../protocol");
const isDev = process.env.ENV === "development";
const port = 4200;
const selfHost = `http://localhost:${port}`;
const config = {
    width: 700,
    height: 500,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, 'dist/less-darker/favicon.ico'),
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
        color: '#080808',
        symbolColor: '#202020',
        height: 25
    }
};

function dev(window) {
    window.loadURL(selfHost);
    window.webContents.once("dom-ready", () => {
        window.webContents.openDevTools();
    });
}

function prod(window) {
    protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler);
    window.loadURL(`${Protocol.scheme}://rse//dist/less-darker/index.html`);
}

module.exports = function setupWindow() {
    let window = new BrowserWindow(config);

    isDev ? dev(window) : prod(window);

    window.once('ready-to-show', () => {
        window.show();
    })
    
    // window.webContents.once("dom-ready", () => {
    //     window.webContents.openDevTools();
    // });
}
