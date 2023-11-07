const { globalShortcut } = require('electron');

module.exports = function setupShortcuts() {
    globalShortcut.register('Shift+Tab', () => {
        console.log('not yet, patience');
    });
}