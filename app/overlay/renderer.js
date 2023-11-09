const pingText = document.getElementById('ping-text');

window.lessdark.ping((event, value) => {
    console.log(value);
    pingText.innerText = `${value}ms`;
});