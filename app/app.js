const socket = io('ws://localhost:8080');

socket.on('message', text => {
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)
});

document.getElementById('inputButton').onclick = () => {
    const text = document.getElementById('input').value;
    socket.emit('message', text)
}