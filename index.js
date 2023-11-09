const { app, desktopCapturer, BrowserWindow } = require('electron');
const lessdarker = require('./lessdarker');
const ping = require('ping');

if (require('electron-squirrel-startup')) app.quit();

let host;
let main;
let overlay;
let gameWindow;

function createWindow() {
  host = new BrowserWindow(lessdarker.host.config);
  main = new BrowserWindow(lessdarker.main.config);

  lessdarker.main.init(main);
  lessdarker.hotkeys.init();
  lessdarker.tray.init();
  checkForGame();
}

function createOverlay() {
  overlay = new BrowserWindow(lessdarker.overlay.config);
  lessdarker.overlay.init(overlay, gameWindow);
  loopPing();
}

function loopPing() {
  setTimeout(() => {
    ping.promise.probe('35.71.175.214', {
      timeout: 10
    }).then(res => {
      if (res.time) {
        main.webContents.send('ping', res.time);
        overlay.webContents.send('ping', res.time);
      }
      loopPing();
    })
  }, 500);
}

async function checkForGame() {
  setTimeout(() => {
    desktopCapturer.getSources({ types: ['window'] }).then(async sources => {
      for (const source of sources) {
        if (source.name === 'Dark and Darker  ') {
          if (!overlay) createOverlay();
          gameWindow = source;
          main.webContents.send('gameIsOpen', true);
          return
        };
      };
    });
    checkForGame();
  }, 5000);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
