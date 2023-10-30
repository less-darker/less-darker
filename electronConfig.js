const {
    app,
    BrowserWindow
  } = require('electron')

  if (require('electron-squirrel-startup')) app.quit();
  
  let appWindow
  
  function createWindow() {
    appWindow = new BrowserWindow({
      width: 500,
      height: 250
    })

    appWindow.loadFile('dist/less-darker/index.html');

    appWindow.on('closed', function () {
      appWindow = null
    })
  }

  app.whenReady().then(() => {
    createWindow()
  })