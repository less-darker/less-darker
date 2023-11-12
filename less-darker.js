const { app, desktopCapturer, BrowserWindow } = require('electron');

const lessdarker = require('./lessdarker');
const windows = lessdarker.windows;
const utils = lessdarker.utils;

const ping = require('ping');

let client;
let overlay;

function init() {
  client = new BrowserWindow(windows.client.config);
  overlay = new BrowserWindow(windows.overlay.config);

  windows.client.init(client);
  windows.overlay.init(overlay);
  windows.tray.init(client);

  utils.hotkeys.init();

  checkForGame();
  loopPing();
}

function echo() {
  ping.promise.probe('35.71.175.214', {
    timeout: 10
  }).then(res => {
    const response = res.time !== 'unknown' ? res.time : '0'

    if (client) client.webContents.send('ping', response);
    if (overlay) overlay.webContents.send('ping', response);
  });
}

function loopPing() {
  setTimeout(() => {
    echo();
  }, 1000);
}

async function checkForGame() {
  if (overlay) {
    overlay.moveTop();
  }
  let isDarker = false;
  // add button on app for manual check (maybe custom toolbar?)

  desktopCapturer.getSources({ types: ['window'] }).then(async sources => {
    for (const source of sources) {
      if (source.name === 'Dark and Darker  ') {
        if (overlay) overlay.show();
        if (client) client.webContents.send('gameIsOpen', true);
        isDarker = true;
      };
    };
  }).catch(err => {
    console.log('If you see this, please email me at fiskoal@lessdarker.com and/or create an issue that includes the error below https://github.com/less-darker/less-darker/issues/new');
    console.log(err);
  }).then(() => {
    if (!isDarker) {
      if (overlay) overlay.hide();
      if (client) client.webContents.send('gameIsOpen', false);
    };

    setTimeout(() => {
      checkForGame();
    }, 10000);
  });
}

if (!require('electron-squirrel-startup')) {
  const instanceLock = app.requestSingleInstanceLock();

  if (!instanceLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
      if (client) {
        if (client.isMinimized()) client.restore();
        client.focus();
      }
    })
  }

  app.whenReady().then(() => {
    init();
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.exit();
  });
} else {
  app.exit();
};