const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/chatapp')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('chatMessage', async (msg) => {
    const message = new Message(msg);
    await message.save();
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});