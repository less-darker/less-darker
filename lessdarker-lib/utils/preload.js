const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('lessdark', {
  ping: (callback) => ipcRenderer.on('ping', callback),
  gameIsOpen: (callback) => ipcRenderer.on('gameIsOpen', callback),
})
