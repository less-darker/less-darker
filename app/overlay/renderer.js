const pingText = document.getElementById('ping-text');

window.lessdark.ping((event, value) => {
    pingText.innerText = `${value}ms`;
});