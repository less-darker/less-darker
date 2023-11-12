const { app, desktopCapturer, BrowserWindow } = require('electron');
const lessdarker = require('./lessdarker');
const ping = require('ping');

let host;
let main;
let overlay;

function init() {
  host = new BrowserWindow(lessdarker.host.config);
  main = new BrowserWindow(lessdarker.main.config);
  overlay = new BrowserWindow(lessdarker.overlay.config);

  lessdarker.main.init(main);
  lessdarker.overlay.init(overlay);
  lessdarker.hotkeys.init();
  lessdarker.tray.init(main);

  checkForGame();
  loopPing();
}

function echo() {
  ping.promise.probe('35.71.175.214', {
    timeout: 10
  }).then(res => {
    const response = res.time !== 'unknown' ? res.time : '0'

    if (main) main.webContents.send('ping', response);
    if (overlay) overlay.webContents.send('ping', response);
  });
}

function loopPing() {
  setTimeout(() => {
    echo();
  }, 1000);
}

async function checkForGame() {
  let isDarker = false;
  // add button on app for manual check (maybe custom toolbar?)

  desktopCapturer.getSources({ types: ['window'] }).then(async sources => {
    for (const source of sources) {
      if (source.name === 'Dark and Darker  ') {
        if (overlay) overlay.show();
        if (main) main.webContents.send('gameIsOpen', true);
        isDarker = true;
      };
    };
  }).catch(err => {
    console.log('If you see this, please create an issue that includes the error below https://github.com/less-darker/less-darker/issues/new');
    console.log(err);
  }).then(() => {
    if (!isDarker) {
      if (overlay) overlay.hide();
      if (main) main.webContents.send('gameIsOpen', false);
    };

    setTimeout(() => {
      checkForGame();
    }, 10000);
  });
}

if (!require('electron-squirrel-startup')) {
  app.requestSingleInstanceLock();
  
  app.on('second-instance', (event) => {
    // add something like event prevent default, hide window?
    app.exit();
  });
  
  app.whenReady().then(() => {
    init();
  });
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.exit();
  });
} else {
  app.exit();
};