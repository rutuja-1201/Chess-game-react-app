const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const gamelogic = require('./game');
const cors = require('cors'); 

const app = express();


app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

// Handle new client connections
io.on('connection', socket => {
    // Initialize the game logic for this client
    gamelogic.initializeGame(io, socket);
});


server.listen(process.env.PORT || 4000);
console.log("Server started on port " + (process.env.PORT || 4000));
