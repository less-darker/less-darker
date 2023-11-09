const { globalShortcut } = require('electron');

function init() {
    globalShortcut.register('Shift+Tab', () => {
        console.log('not yet, patience');
    });
}

module.exports = { init }