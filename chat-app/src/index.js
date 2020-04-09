const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit('message', generateMessage('Admin', 'Welcome'));
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage(user.username, `${user.username} has joined!`)
      );

    callback();
  });

  socket.on('sendMessage', ({ message }, callback) => {
    const user = getUser(socket.id);
    if (!user) return;

    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('sendLocation', ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    if (!user) return;

    io.to(user.room).emit(
      'locationMessage',
      generateLocationMessage(
        user.username,
        `https://google.com/maps?q=${latitude},${longitude}`
      )
    );

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage('Admin', `${user.username} has disconneted!`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
