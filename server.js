// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static files (the frontend)
app.use(express.static('public'));

// When a user connects
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast message to all other users when a message is received
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
