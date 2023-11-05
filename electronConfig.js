const { app, protocol, BrowserWindow } = require('electron');
const path = require('path');
const Protocol = require("./protocol");
const isDev = process.env.ENV === "development";
const port = 4200;
const selfHost = `http://localhost:${port}`;

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
  if (!isDev) {
    protocol.registerBufferProtocol(Protocol.scheme, Protocol.requestHandler);
  }

  let win = new BrowserWindow({
    width: 1600,
    height: 1000,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, 'dist/less-darker/favicon.ico'),
    show: false
  });

  win.once('ready-to-show', () => {
    win.show();
  })

  if (isDev) {
    console.log('*** RUNNING IN DEV ***');
    win.loadURL(selfHost);

    win.webContents.once("dom-ready", () => {
      win.webContents.openDevTools();
    });
  } else {
    win.loadURL(`${Protocol.scheme}://rse//dist/less-darker/index.html`);
  }

  win.on('close', function () {
    appWindow.quit();
  });
}

protocol.registerSchemesAsPrivileged([{
  scheme: Protocol.scheme,
  privileges: {
      standard: true,
      secure: true
  }
}]);

app.whenReady().then(() => {
  createWindow();
});