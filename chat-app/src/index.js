const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', () => {
  console.log('New WebSocket Connection');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
