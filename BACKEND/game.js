const gameInSession = [];
let io;
let gameSocket;

const initializeGame = (sio, socket) => {
    console.log("sio", sio);
    io = sio;
    gameSocket = socket;
    gameInSession.push(gameSocket);

    gameSocket.on('disconnect', onDisconnect);
    gameSocket.on('new move', newMove);
    gameSocket.on('createNewgame', newGame);
    gameSocket.on('playerJoinGame', playerJoinsGame);
    gameSocket.on('request username', requestUserName);
    gameSocket.on('received userName', receivedUserName);

};



function playerJoinsGame(idData) {
    const sock = this;
    const room = io.sockets.adapter.rooms[idData.gameId];

    if (room === undefined) {
        sock.emit('status', "This game session is not available");
        return;
    }

    if (room.length < 2) {
        idData.mySocketId = sock.id;
        sock.join(idData.gameId);

        console.log(room.length);

        if (room.length === 2) {
            io.sockets.in(idData.gameId).emit('start game session', idData.userName);
        }
    }
}
