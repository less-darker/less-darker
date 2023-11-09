const { app, desktopCapturer, BrowserWindow } = require('electron');
const lessdarker = require('./lessdarker-lib/lessdarker.module');
const ping = require('ping');

if (require('electron-squirrel-startup')) app.quit();

let window;

function createWindow() {
  window = new BrowserWindow(lessdarker.window.config);

  lessdarker.window.init(window);
  lessdarker.hotkeys.init();
  lessdarker.tray.init();
  loopPing();
  checkForGame();
}

function loopPing() {
  setTimeout(() => {
    ping.promise.probe('35.71.175.214', {
      timeout: 10
    }).then(res => {
      window.webContents.send('ping', res.time);
      loopPing();
    })
  }, 500);
}

async function checkForGame() {
  desktopCapturer.getSources({ types: ['window'] }).then(async sources => {
    for (const source of sources) {
      if (source.name.includes('Dark and Darker')) {
        window.webContents.send('gameIsOpen', true);
        return
      } else {
        setTimeout(() => {
          checkForGame();
        }, 1000);
      }
    }
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  };
});
