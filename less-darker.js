const { app, protocol, BrowserWindow } = require('electron');
const Protocol = require("./protocol");
const lessdarker = require('./less-darker-lib');

if (require('electron-squirrel-startup')) app.quit();

function createWindow() {
  lessdarker.setupShortcuts();
  lessdarker.setupTray();
  lessdarker.setupWindow();
}

// for electron-sockets
protocol.registerSchemesAsPrivileged([{
  scheme: Protocol.scheme,
  privileges: {
    standard: true,
    secure: true
  }
}]);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
