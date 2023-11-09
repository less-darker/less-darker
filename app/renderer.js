const pingText = document.getElementById('ping-text');
const gameStatusText = document.getElementById('game-status-text');

window.lessdark.ping((event, value) => {
    pingText.innerText = `${value}ms`;
});

window.lessdark.gameIsOpen((event, value) => {
    gameStatusText.innerText = value ? 'is open' : 'is not open';
});