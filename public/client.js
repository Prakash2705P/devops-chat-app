const socket = io();

function sendMessage() {
  const user = document.getElementById('username').value;
  const text = document.getElementById('messageInput').value;

  if (user && text) {
    socket.emit('chatMessage', { user, text });
    document.getElementById('messageInput').value = '';
  }
}

socket.on('chatMessage', (msg) => {
  const div = document.createElement('div');
  div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
  document.getElementById('messages').appendChild(div);
});