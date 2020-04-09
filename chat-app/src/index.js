const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  socket.emit('message', generateMessage('Welcome'));

  socket.broadcast.emit('message', generateMessage('New user has joined!'));

  socket.on('sendMessage', ({ message }, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.emit('message', generateMessage(message));
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    io.emit(
      'locationMessage',
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );

    callback();
  });

  socket.on('disconnect', () => {
    io.emit('message', { message: 'User has disconnected' });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
