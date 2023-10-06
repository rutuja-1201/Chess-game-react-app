import io from 'socket.io-client';

// Define the URL for the Socket.io server
const SERVER_URL = 'http://localhost:4000';

// Create a Socket.io client instance
const socket = io(SERVER_URL);

// Initialize a variable to store the client's socket ID
let mySocketId;

// Listen for the 'createNewGame' event to receive the socket ID
socket.on('createNewGame', (statusUpdate) => {
  mySocketId = statusUpdate.mySocketId;
});

// Export the socket and the client's socket ID
export { socket, mySocketId };
